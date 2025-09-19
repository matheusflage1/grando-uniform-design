import { useState, useCallback } from 'react';

interface SecurityValidationResult {
  isValid: boolean;
  errors: string[];
  sanitized?: any;
}

interface ValidationRules {
  email?: boolean;
  phone?: boolean;
  maxLength?: number;
  minLength?: number;
  noScripts?: boolean;
  noSql?: boolean;
}

export const useSecurityValidation = () => {
  const [isValidating, setIsValidating] = useState(false);

  // Enhanced phone number validation for Brazilian format
  const validatePhone = (phone: string): boolean => {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Brazilian phone formats: (XX) 9XXXX-XXXX or (XX) XXXXX-XXXX
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  // Enhanced email validation with domain checking
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) return false;
    
    // Block suspicious domains
    const suspiciousDomains = ['temp-mail.org', '10minutemail.com', 'guerrillamail.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    return !suspiciousDomains.includes(domain);
  };

  // XSS and injection protection
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
      .replace(/on\w+='[^']*'/gi, '') // Remove event handlers
      .replace(/[<>]/g, '') // Remove angle brackets
      .trim();
  };

  // SQL injection pattern detection
  const detectSqlInjection = (input: string): boolean => {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /'[^']*'(\s*;\s*\w+)/gi,
      /--[^\r\n]*/gi,
      /\/\*[\s\S]*?\*\//gi
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  };

  const validateField = useCallback((
    value: string,
    rules: ValidationRules
  ): SecurityValidationResult => {
    const errors: string[] = [];
    let sanitized = value;

    try {
      setIsValidating(true);

      // Length validation
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`Deve ter pelo menos ${rules.minLength} caracteres`);
      }
      
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`Deve ter no máximo ${rules.maxLength} caracteres`);
      }

      // Security sanitization
      if (rules.noScripts) {
        sanitized = sanitizeInput(value);
        if (sanitized !== value) {
          errors.push('Conteúdo suspeito detectado e removido');
        }
      }

      // SQL injection detection
      if (rules.noSql && detectSqlInjection(value)) {
        errors.push('Conteúdo não permitido detectado');
      }

      // Specific field validations
      if (rules.email && !validateEmail(value)) {
        errors.push('Email inválido ou de domínio suspeito');
      }

      if (rules.phone && !validatePhone(value)) {
        errors.push('Telefone deve seguir o formato brasileiro (XX) XXXXX-XXXX');
      }

      return {
        isValid: errors.length === 0,
        errors,
        sanitized
      };

    } finally {
      setIsValidating(false);
    }
  }, []);

  const validateForm = useCallback((formData: Record<string, any>): SecurityValidationResult => {
    const allErrors: string[] = [];
    const sanitizedData: Record<string, any> = {};

    // Define validation rules for each field
    const fieldRules: Record<string, ValidationRules> = {
      nome: { minLength: 2, maxLength: 100, noScripts: true, noSql: true },
      email: { email: true, maxLength: 255, noScripts: true, noSql: true },
      telefone: { phone: true, noScripts: true, noSql: true },
      funcionarios: { minLength: 1, maxLength: 50, noScripts: true, noSql: true },
      estado: { minLength: 2, maxLength: 50, noScripts: true, noSql: true }
    };

    // Validate each field
    Object.entries(formData).forEach(([field, value]) => {
      if (typeof value === 'string' && fieldRules[field]) {
        const result = validateField(value, fieldRules[field]);
        
        if (!result.isValid) {
          allErrors.push(...result.errors.map(error => `${field}: ${error}`));
        }
        
        sanitizedData[field] = result.sanitized || value;
      } else {
        sanitizedData[field] = value;
      }
    });

    return {
      isValid: allErrors.length === 0,
      errors: allErrors,
      sanitized: sanitizedData
    };
  }, [validateField]);

  return {
    validateField,
    validateForm,
    isValidating
  };
};