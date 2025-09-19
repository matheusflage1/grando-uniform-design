-- Priority 1: Encrypt Facebook Access Tokens
-- Add encryption support for access tokens
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create function to encrypt access tokens
CREATE OR REPLACE FUNCTION encrypt_access_token(token text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT encode(
    encrypt(
      token::bytea,
      'facebook_token_key_2024'::bytea,
      'aes'
    ),
    'base64'
  );
$$;

-- Create function to decrypt access tokens
CREATE OR REPLACE FUNCTION decrypt_access_token(encrypted_token text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT convert_from(
    decrypt(
      decode(encrypted_token, 'base64'),
      'facebook_token_key_2024'::bytea,
      'aes'
    ),
    'UTF8'
  );
$$;

-- Add token expiry tracking
ALTER TABLE facebook_ad_accounts 
ADD COLUMN IF NOT EXISTS token_expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS token_encrypted boolean DEFAULT false;

-- Create audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  action text NOT NULL,
  table_name text,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (is_admin(auth.uid()));

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    ip_address
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END,
    CASE 
      WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)
      WHEN TG_OP = 'UPDATE' THEN to_jsonb(OLD)
      ELSE NULL
    END,
    CASE 
      WHEN TG_OP = 'INSERT' THEN to_jsonb(NEW)
      WHEN TG_OP = 'UPDATE' THEN to_jsonb(NEW)
      ELSE NULL
    END,
    inet_client_addr()
  );
  
  RETURN CASE 
    WHEN TG_OP = 'DELETE' THEN OLD
    ELSE NEW
  END;
END;
$$;

-- Add audit triggers to sensitive tables
CREATE TRIGGER audit_facebook_ad_accounts
  AFTER INSERT OR UPDATE OR DELETE ON facebook_ad_accounts
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_user_roles
  AFTER INSERT OR UPDATE OR DELETE ON user_roles
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Data retention: Auto-cleanup old contact submissions (keep for 1 year)
CREATE OR REPLACE FUNCTION cleanup_old_contact_submissions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  DELETE FROM public.contact_form_submissions 
  WHERE submitted_at < now() - interval '1 year';
$$;

-- Enhanced rate limiting with stricter limits
CREATE OR REPLACE FUNCTION check_contact_form_rate_limit(client_ip inet, client_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  submission_count integer;
BEGIN
  -- Stricter IP-based rate limiting (max 2 per hour instead of 3)
  SELECT COUNT(*) INTO submission_count
  FROM public.contact_form_submissions
  WHERE ip_address = client_ip 
    AND submitted_at > now() - interval '1 hour';
  
  IF submission_count >= 2 THEN
    RETURN false;
  END IF;
  
  -- Stricter email-based rate limiting (max 1 per email per day instead of 2)
  SELECT COUNT(*) INTO submission_count
  FROM public.contact_form_submissions
  WHERE email = client_email 
    AND submitted_at > now() - interval '24 hours';
    
  IF submission_count >= 1 THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;