// React ve gerekli hook'ları import ediyoruz
import React, { createContext, useContext, useState, useEffect } from 'react';

// Pozisyon tipini tanımlıyoruz - Her pozisyon için gerekli özellikleri içerir
interface Position {
  id: number;          // Benzersiz kimlik
  name: string;        // Kişi adı
  title: string;       // Unvan
  department: string;  // Departman
  level: number;       // Hiyerarşi seviyesi
  parentId: number | null; // Bağlı olduğu üst pozisyon
}

// Context'in tipini tanımlıyoruz - Context üzerinden erişilebilecek değer ve fonksiyonlar
interface OrganizationContextType {
  positions: Position[];  // Tüm pozisyonların listesi
  addPosition: (position: Omit<Position, 'id'>) => void;  // Yeni pozisyon ekleme fonksiyonu
  updatePosition: (id: number, position: Partial<Position>) => void;  // Pozisyon güncelleme
  deletePosition: (id: number) => void;  // Pozisyon silme
}

// Context'i oluşturuyoruz
const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

// Başlangıç verileri - Varsayılan organizasyon yapısı
const initialPositions = [
  {
    id: 1,
    name: 'Prof. Dr. Ahmet YILMAZ',
    title: 'Genel Müdür',
    department: '',
    level: 1,
    parentId: null,
  },
  {
    id: 2,
    name: 'Dr. Mehmet DEMİR',
    title: 'Genel Müdür Yardımcısı',
    department: 'Teknik İşler',
    level: 2,
    parentId: 1,
  },
  {
    id: 3,
    name: 'Fatma YILDIRIM',
    title: 'Genel Müdür Yardımcısı',
    department: 'İdari İşler',
    level: 2,
    parentId: 1,
  },
];

// Context Provider bileşeni - Uygulama genelinde veri paylaşımını sağlar
export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  // Pozisyonları state olarak tutuyoruz
  const [positions, setPositions] = useState<Position[]>(initialPositions);

  // Sayfa yüklendiğinde Local Storage'dan verileri okuyoruz
  useEffect(() => {
    const savedPositions = localStorage.getItem('organizationPositions');
    if (savedPositions) {
      setPositions(JSON.parse(savedPositions));
    }
  }, []);

  // Pozisyonlar değiştiğinde Local Storage'a kaydediyoruz
  useEffect(() => {
    localStorage.setItem('organizationPositions', JSON.stringify(positions));
  }, [positions]);

  // Yeni pozisyon ekleme fonksiyonu
  const addPosition = (position: Omit<Position, 'id'>) => {
    const newId = Math.max(...positions.map(p => p.id), 0) + 1;
    setPositions(prev => [...prev, { ...position, id: newId }]);
  };

  // Pozisyon güncelleme fonksiyonu
  const updatePosition = (id: number, updatedPosition: Partial<Position>) => {
    setPositions(prev =>
      prev.map(position =>
        position.id === id ? { ...position, ...updatedPosition } : position
      )
    );
  };

  // Pozisyon silme fonksiyonu
  const deletePosition = (id: number) => {
    setPositions(prev => prev.filter(position => position.id !== id));
  };

  // Context Provider'ı ile değer ve fonksiyonları alt bileşenlere aktarıyoruz
  return (
    <OrganizationContext.Provider
      value={{
        positions,
        addPosition,
        updatePosition,
        deletePosition,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

// Custom hook - Context'e kolay erişim sağlar
export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within a OrganizationProvider');
  }
  return context;
}
