import React, { createContext, useContext, useState } from 'react';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  isActive: boolean;
}

interface AuthContextType {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
}

const initialPermissions: Permission[] = [
  { id: '1', name: 'dashboard_view', description: 'Dashboard görüntüleme' },
  { id: '2', name: 'news_create', description: 'Haber oluşturma' },
  { id: '3', name: 'news_edit', description: 'Haber düzenleme' },
  { id: '4', name: 'news_delete', description: 'Haber silme' },
  { id: '5', name: 'pages_manage', description: 'Sayfa yönetimi' },
  { id: '6', name: 'organization_manage', description: 'Organizasyon yönetimi' },
  { id: '7', name: 'users_manage', description: 'Kullanıcı yönetimi' },
  { id: '8', name: 'roles_manage', description: 'Rol yönetimi' },
];

const initialRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Tam yetkili yönetici',
    permissions: initialPermissions.map(p => p.id),
  },
  {
    id: '2',
    name: 'Editor',
    description: 'İçerik editörü',
    permissions: ['1', '2', '3', '4', '5'],
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Sadece görüntüleme',
    permissions: ['1'],
  },
];

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@dsi.gov.tr',
    role: '1',
    department: 'Bilgi İşlem',
    isActive: true,
  },
  {
    id: '2',
    name: 'Editor User',
    email: 'editor@dsi.gov.tr',
    role: '2',
    department: 'Basın ve Halkla İlişkiler',
    isActive: true,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [permissions] = useState<Permission[]>(initialPermissions);

  const addUser = (user: Omit<User, 'id'>) => {
    const newId = String(Math.max(...users.map(u => Number(u.id)), 0) + 1);
    setUsers(prev => [...prev, { ...user, id: newId }]);
  };

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const addRole = (role: Omit<Role, 'id'>) => {
    const newId = String(Math.max(...roles.map(r => Number(r.id)), 0) + 1);
    setRoles(prev => [...prev, { ...role, id: newId }]);
  };

  const updateRole = (id: string, updatedRole: Partial<Role>) => {
    setRoles(prev =>
      prev.map(role =>
        role.id === id ? { ...role, ...updatedRole } : role
      )
    );
  };

  const deleteRole = (id: string) => {
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        roles,
        permissions,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
