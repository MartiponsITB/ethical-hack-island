
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, UserX, ShieldCheck, Users } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface User {
  id: number;
  username: string;
  is_admin: boolean;
  created_at: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
      toast({
        title: "Acceso denegado",
        description: "Necesitas permisos de administrador para acceder a esta página.",
        variant: "destructive",
      });
      return;
    }
    
    fetchUsers();
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/manage-users.php', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        throw new Error(data.error || 'Error al obtener usuarios');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const deleteUser = async (userId: number, username: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar al usuario "${username}"?`)) {
      return;
    }
    
    try {
      const response = await fetch('/api/admin/manage-users.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'delete', userId }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }
      
      const data = await response.json();
      if (data.success) {
        toast({
          title: "Usuario eliminado",
          description: `El usuario "${username}" ha sido eliminado correctamente.`,
          variant: "default",
        });
        fetchUsers(); // Refresh the list
      } else {
        throw new Error(data.error || 'Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null; // Prevent flickering while redirecting
  }

  return (
    <div className="bg-cyber-black min-h-screen">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 mr-2 text-cyber-green" />
            <h1 className="text-3xl font-bold cyber-title">Panel de Administración</h1>
          </div>
          
          <Card className="cyber-container bg-cyber-black border-cyber-green/30 mb-8">
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Administra los usuarios registrados en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Cargando usuarios...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-cyber-green/20">
                        <th className="px-4 py-3 text-left">ID</th>
                        <th className="px-4 py-3 text-left">Usuario</th>
                        <th className="px-4 py-3 text-left">Rol</th>
                        <th className="px-4 py-3 text-left">Creado</th>
                        <th className="px-4 py-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-muted-foreground">
                            No hay usuarios registrados
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id} className="border-b border-cyber-green/10">
                            <td className="px-4 py-3">{user.id}</td>
                            <td className="px-4 py-3">{user.username}</td>
                            <td className="px-4 py-3">
                              {user.is_admin ? (
                                <span className="flex items-center">
                                  <ShieldCheck className="h-4 w-4 text-cyber-green mr-1" />
                                  Admin
                                </span>
                              ) : (
                                "Usuario"
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                onClick={() => deleteUser(user.id, user.username)}
                                disabled={user.is_admin} // Prevent deletion of admin users
                                title={user.is_admin ? "No se puede eliminar a un administrador" : "Eliminar usuario"}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
