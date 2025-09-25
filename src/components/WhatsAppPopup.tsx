import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    gtag_report_conversion_contact: (url?: string) => boolean;
  }
}

interface WhatsAppPopupProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink: string;
}

const WhatsAppPopup = ({ isOpen, onClose, whatsappLink }: WhatsAppPopupProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Limite de 11 dígitos (DDD + número)
    const limited = numbers.slice(0, 11);
    
    // Aplica a formatação (DD) 9XXXX-XXXX
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 7) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 11 && numbers.startsWith('11', 0); // Aceita qualquer DDD mas força 11 dígitos
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSubmit = async () => {
    const numbersOnly = phoneNumber.replace(/\D/g, '');
    
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Por favor, insira um número válido com DDD (11 dígitos)');
      return;
    }

    setIsSubmitting(true);

    try {
      // Salvar o número no Supabase
      const { error } = await supabase
        .from('whatsapp_leads')
        .insert({
          phone_number: numbersOnly,
          ip_address: null, // Será preenchido pelo RLS se necessário
          source_page: window.location.pathname
        });

      if (error) {
        throw error;
      }

      // Enviar conversão de Contato e redirecionar para WhatsApp
      if (typeof window.gtag_report_conversion_contact !== 'undefined') {
        window.gtag_report_conversion_contact(whatsappLink);
      } else {
        window.open(whatsappLink, '_blank');
      }

      toast.success('Número salvo! Redirecionando para WhatsApp...');
      onClose();
      setPhoneNumber('');
    } catch (error) {
      console.error('Error saving WhatsApp lead:', error);
      toast.error('Erro ao processar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#1B1B0C] flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-600" />
              Conversar no WhatsApp
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="text-center">
            <img 
              src="/lovable-uploads/4376058e-6435-4383-808e-6c861f93344c.png" 
              alt="Natalia Grando Logo" 
              className="h-20 mx-auto mb-4" 
            />
            <p className="text-gray-600 mb-4">
              Para continuar, digite seu número de WhatsApp com DDD
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Número do WhatsApp
            </label>
            <Input
              type="tel"
              placeholder="(11) 99999-9999"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="text-center text-lg"
              maxLength={15}
            />
            <p className="text-xs text-gray-500 text-center">
              Digite seu número com DDD (apenas números brasileiros)
            </p>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!validatePhoneNumber(phoneNumber) || isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? (
                'Processando...'
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Conversar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppPopup;