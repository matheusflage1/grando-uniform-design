-- Fix encryption functions with correct pgcrypto usage

-- Create function to encrypt access tokens (corrected version)
CREATE OR REPLACE FUNCTION encrypt_access_token(token text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  encryption_key text := 'facebook_token_key_2024_secure_key_256bit!!';
BEGIN
  RETURN encode(
    pgp_sym_encrypt(token, encryption_key),
    'base64'
  );
END;
$$;

-- Create function to decrypt access tokens (corrected version)
CREATE OR REPLACE FUNCTION decrypt_access_token(encrypted_token text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  encryption_key text := 'facebook_token_key_2024_secure_key_256bit!!';
BEGIN
  RETURN pgp_sym_decrypt(
    decode(encrypted_token, 'base64'),
    encryption_key
  );
END;
$$;