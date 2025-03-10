
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pt' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

export const translations = {
  en: {
    // Header
    'app.title': 'QR Tracker System',
    // Navigation
    'nav.home': 'Home',
    'nav.scanner': 'Scanner',
    'nav.inventory': 'Inventory',
    // Common
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search...',
    // Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.welcome': 'Welcome back!',
    'auth.loginSuccess': 'Login successful',
    'auth.accessBlocked': 'Access blocked',
    'auth.accessRevokedMessage': 'Your access has been revoked. Please login again.',
    // Items
    'item.details': 'Item Details',
    'item.addItem': 'Add Item',
    'item.brand': 'Brand',
    'item.category': 'Category',
    'item.dimensions': 'Dimensions',
    'item.price': 'Price per m²',
    'item.location': 'Location',
    'item.createdAt': 'Created at',
    'item.code': 'Code',
    'item.actions': 'Actions',
    // Units
    'units.meters': 'Meters',
    'units.inches': 'Inches',
    // Consumption
    'consumption.record': 'Record Usage',
  },
  pt: {
    // Header
    'app.title': 'Sistema de Rastreamento QR',
    // Navigation
    'nav.home': 'Início',
    'nav.scanner': 'Scanner',
    'nav.inventory': 'Inventário',
    // Common
    'common.back': 'Voltar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.add': 'Adicionar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.search': 'Pesquisar...',
    // Auth
    'auth.login': 'Entrar',
    'auth.logout': 'Sair',
    'auth.welcome': 'Bem-vindo de volta!',
    'auth.loginSuccess': 'Login realizado com sucesso',
    'auth.accessBlocked': 'Acesso bloqueado',
    'auth.accessRevokedMessage': 'Seu acesso foi revogado. Por favor, faça login novamente.',
    // Items
    'item.details': 'Detalhes do Item',
    'item.addItem': 'Adicionar Item',
    'item.brand': 'Marca',
    'item.category': 'Categoria',
    'item.dimensions': 'Dimensões',
    'item.price': 'Preço por m²',
    'item.location': 'Localização',
    'item.createdAt': 'Criado em',
    'item.code': 'Código',
    'item.actions': 'Ações',
    // Units
    'units.meters': 'Metros',
    'units.inches': 'Polegadas',
    // Consumption
    'consumption.record': 'Registrar Uso',
  },
  es: {
    // Header
    'app.title': 'Sistema de Seguimiento QR',
    // Navigation
    'nav.home': 'Inicio',
    'nav.scanner': 'Escáner',
    'nav.inventory': 'Inventario',
    // Common
    'common.back': 'Volver',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.add': 'Añadir',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.search': 'Buscar...',
    // Auth
    'auth.login': 'Iniciar sesión',
    'auth.logout': 'Cerrar sesión',
    'auth.welcome': '¡Bienvenido de nuevo!',
    'auth.loginSuccess': 'Inicio de sesión exitoso',
    'auth.accessBlocked': 'Acceso bloqueado',
    'auth.accessRevokedMessage': 'Su acceso ha sido revocado. Por favor, inicie sesión nuevamente.',
    // Items
    'item.details': 'Detalles del Artículo',
    'item.addItem': 'Añadir Artículo',
    'item.brand': 'Marca',
    'item.category': 'Categoría',
    'item.dimensions': 'Dimensiones',
    'item.price': 'Precio por m²',
    'item.location': 'Ubicación',
    'item.createdAt': 'Creado en',
    'item.code': 'Código',
    'item.actions': 'Acciones',
    // Units
    'units.meters': 'Metros',
    'units.inches': 'Pulgadas',
    // Consumption
    'consumption.record': 'Registrar Uso',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
