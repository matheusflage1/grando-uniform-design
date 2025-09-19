-- Fix Critical Security Issue: Privilege Escalation
-- Remove user ability to self-assign roles

-- Drop the existing policy that allows users to insert their own roles
DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;

-- Create admin-only function to assign roles
CREATE OR REPLACE FUNCTION public.assign_user_role(target_user_id uuid, target_role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only admins can assign roles
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;
  
  -- Insert the role (will be ignored if it already exists due to unique constraint)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, target_role)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Create admin-only function to revoke roles
CREATE OR REPLACE FUNCTION public.revoke_user_role(target_user_id uuid, target_role app_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only admins can revoke roles
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;
  
  -- Delete the role
  DELETE FROM public.user_roles 
  WHERE user_id = target_user_id AND role = target_role;
END;
$$;

-- Create function to safely create the first admin user
CREATE OR REPLACE FUNCTION public.create_initial_admin(admin_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Find user by email from profiles table
  SELECT id INTO admin_user_id FROM public.profiles WHERE email = admin_email;
  
  IF admin_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', admin_email;
  END IF;
  
  -- Insert admin role (will be ignored if it already exists)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (admin_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Add rate limiting table for contact form
CREATE TABLE IF NOT EXISTS public.contact_form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  email text NOT NULL
);

-- Enable RLS on rate limiting table
ALTER TABLE public.contact_form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert (for rate limiting checks)
CREATE POLICY "Anyone can insert contact submissions" ON public.contact_form_submissions
FOR INSERT WITH CHECK (true);

-- Policy to allow only admins to view submissions
CREATE POLICY "Only admins can view contact submissions" ON public.contact_form_submissions
FOR SELECT USING (public.is_admin(auth.uid()));

-- Create function to check rate limits
CREATE OR REPLACE FUNCTION public.check_contact_form_rate_limit(client_ip inet, client_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  submission_count integer;
BEGIN
  -- Count submissions from this IP in the last hour
  SELECT COUNT(*) INTO submission_count
  FROM public.contact_form_submissions
  WHERE ip_address = client_ip 
    AND submitted_at > now() - interval '1 hour';
  
  -- Allow max 3 submissions per IP per hour
  IF submission_count >= 3 THEN
    RETURN false;
  END IF;
  
  -- Also check email-based rate limiting (max 2 per email per day)
  SELECT COUNT(*) INTO submission_count
  FROM public.contact_form_submissions
  WHERE email = client_email 
    AND submitted_at > now() - interval '24 hours';
    
  IF submission_count >= 2 THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Create function to log contact form submissions for rate limiting
CREATE OR REPLACE FUNCTION public.log_contact_submission(client_ip inet, client_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.contact_form_submissions (ip_address, email)
  VALUES (client_ip, client_email);
END;
$$;