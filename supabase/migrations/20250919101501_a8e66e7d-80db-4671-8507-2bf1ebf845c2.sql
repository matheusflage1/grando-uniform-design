-- Remove the dangerous public SELECT policy that exposes customer data
DROP POLICY IF EXISTS "Allow all to view contact data" ON public.natalia;

-- Create a new policy that only allows authenticated users to view contact data
-- This ensures customer information is protected and only accessible to logged-in users
CREATE POLICY "Authenticated users can view contact data" 
ON public.natalia 
FOR SELECT 
TO authenticated
USING (true);

-- Keep the INSERT policy as is so the contact form continues to work
-- The existing "Anyone can insert contact data" policy remains unchanged
-- to ensure the public contact form functionality continues working