import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Mail, Phone, Users, MapPin, Calendar, Shield, AlertTriangle } from 'lucide-react';
import { AuditLogs } from '@/components/admin/AuditLogs';
import { SecurityAlert } from '@/components/SecurityAlert';

interface ContactSubmission {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  funcionarios: string;
  estado: string;
  created_at: string;
}

const Admin = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (user && !isAdmin && !loading) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissões de administrador.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    if (isAdmin) {
      fetchContacts();
    }
  }, [user, isAdmin, loading, navigate, toast]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('natalia')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os contatos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer logout.",
        variant: "destructive",
      });
    } else {
      navigate('/auth');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ECE08A] via-[#ECE08A] to-[#F5F1A0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#62624C] mx-auto"></div>
          <p className="mt-4 text-[#1B1B0C] font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE08A] via-[#ECE08A] to-[#F5F1A0]">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/lovable-uploads/4376058e-6435-4383-808e-6c861f93344c.png" alt="Natalia Grando Logo" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold text-[#1B1B0C]">Painel Administrativo</h1>
              <Badge variant="secondary" className="mt-1">
                Administrador
              </Badge>
            </div>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-[#62624C] text-[#62624C] hover:bg-[#62624C] hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Security Alert */}
        <div className="mb-6">
          <SecurityAlert 
            type="warning" 
            message="Sistema de segurança ativo: Todas as ações administrativas são monitoradas e registradas nos logs de auditoria." 
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Solicitações ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Segurança
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="mt-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#1B1B0C] mb-2">
                Solicitações de Orçamento
              </h2>
              <p className="text-[#62624C]">
                Total de {contacts.length} solicitações recebidas
              </p>
            </div>

            {contacts.length === 0 ? (
              <Card className="text-center p-8">
                <CardContent>
                  <Mail className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <CardTitle className="text-xl mb-2">Nenhuma solicitação encontrada</CardTitle>
                  <CardDescription>
                    Quando os clientes enviarem solicitações de orçamento, elas aparecerão aqui.
                  </CardDescription>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {contacts.map((contact) => (
                  <Card key={contact.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-[#1B1B0C]">
                            {contact.nome}
                          </CardTitle>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(contact.created_at)}
                          </div>
                        </div>
                        <Badge variant="outline" className="border-[#62624C] text-[#62624C]">
                          {contact.funcionarios} funcionários
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-[#62624C]" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-[#62624C]" />
                          <div>
                            <p className="text-sm font-medium">Telefone</p>
                            <p className="text-sm text-gray-600">{contact.telefone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-[#62624C]" />
                          <div>
                            <p className="text-sm font-medium">Funcionários</p>
                            <p className="text-sm text-gray-600">{contact.funcionarios}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-[#62624C]" />
                          <div>
                            <p className="text-sm font-medium">Estado</p>
                            <p className="text-sm text-gray-600">{contact.estado}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <Button 
                          asChild
                          className="bg-[#62624C] hover:bg-[#4e4e3c]"
                        >
                          <a 
                            href={`mailto:${contact.email}?subject=Orçamento de Uniformes Corporativos - ${contact.nome}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Responder por Email
                          </a>
                        </Button>
                        
                        <Button 
                          asChild
                          variant="outline"
                          className="border-[#62624C] text-[#62624C] hover:bg-[#62624C] hover:text-white"
                        >
                          <a 
                            href={`https://wa.me/55${contact.telefone.replace(/\D/g, '')}?text=Olá%20${contact.nome.replace(/\s/g, '%20')}%2C%20recebi%20sua%20solicitação%20de%20orçamento%20para%20${contact.funcionarios}%20funcionários.%20Vamos%20conversar%3F`}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            WhatsApp
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <AuditLogs />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;