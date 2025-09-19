-- Fix security linter warnings by setting proper search paths

-- Update encrypt_access_token function with search path
CREATE OR REPLACE FUNCTION encrypt_access_token(token text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
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

-- Update decrypt_access_token function with search path
CREATE OR REPLACE FUNCTION decrypt_access_token(encrypted_token text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
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

-- Update audit_trigger_function with search path
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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

-- Update cleanup function with search path
CREATE OR REPLACE FUNCTION cleanup_old_contact_submissions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  DELETE FROM public.contact_form_submissions 
  WHERE submitted_at < now() - interval '1 year';
$$;