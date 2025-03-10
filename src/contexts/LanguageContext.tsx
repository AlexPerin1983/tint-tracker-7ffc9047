import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pt' | 'es' | 'zh' | 'ar' | 'de' | 'fr' | 'ja' | 'ko';

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
    'auth.accessRevokedMessage': 'Su acceso ha sido revogado. Por favor, inicie sesión nuevamente.',
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
  },
  zh: {
    'app.title': 'QR追踪系统',
    'nav.home': '首页',
    'nav.scanner': '扫描器',
    'nav.inventory': '库存',
    'common.back': '返回',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.add': '添加',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.search': '搜索...',
    'auth.login': '登录',
    'auth.logout': '登出',
    'auth.welcome': '欢迎回来！',
    'auth.loginSuccess': '登录成功',
    'auth.accessBlocked': '访问被阻止',
    'auth.accessRevokedMessage': '您的访问权限已被撤销。请重新登录。',
    'item.details': '物品详情',
    'item.addItem': '添加物品',
    'item.brand': '品牌',
    'item.category': '类别',
    'item.dimensions': '尺寸',
    'item.price': '每平方米价格',
    'item.location': '位置',
    'item.createdAt': '创建于',
    'item.code': '代码',
    'item.actions': '操作',
    'units.meters': '米',
    'units.inches': '英寸',
    'consumption.record': '记录使用量'
  },
  ar: {
    'app.title': 'نظام تتبع QR',
    'nav.home': 'الرئيسية',
    'nav.scanner': 'الماسح',
    'nav.inventory': 'المخزون',
    'common.back': 'رجوع',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.add': 'إضافة',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث...',
    'auth.login': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'auth.welcome': 'مرحباً بعودتك!',
    'auth.loginSuccess': 'تم تسجيل الدخول بنجاح',
    'auth.accessBlocked': 'تم حظر الوصول',
    'auth.accessRevokedMessage': 'تم إلغاء صلاحية وصولك. الرجاء تسجيل الدخول مرة أخرى.',
    'item.details': 'تفاصيل المنتج',
    'item.addItem': 'إضافة منتج',
    'item.brand': 'العلامة التجارية',
    'item.category': 'الفئة',
    'item.dimensions': 'الأبعاد',
    'item.price': 'السعر لكل متر مربع',
    'item.location': 'الموقع',
    'item.createdAt': 'تم الإنشاء ف��',
    'item.code': 'الرمز',
    'item.actions': 'الإجراءات',
    'units.meters': 'متر',
    'units.inches': 'بوصة',
    'consumption.record': 'تسجيل الاستهلاك'
  },
  de: {
    'app.title': 'QR-Tracking-System',
    'nav.home': 'Startseite',
    'nav.scanner': 'Scanner',
    'nav.inventory': 'Inventar',
    'common.back': 'Zurück',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.add': 'Hinzufügen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.search': 'Suchen...',
    'auth.login': 'Anmelden',
    'auth.logout': 'Abmelden',
    'auth.welcome': 'Willkommen zurück!',
    'auth.loginSuccess': 'Anmeldung erfolgreich',
    'auth.accessBlocked': 'Zugriff blockiert',
    'auth.accessRevokedMessage': 'Ihr Zugriff wurde widerrufen. Bitte melden Sie sich erneut an.',
    'item.details': 'Artikeldetails',
    'item.addItem': 'Artikel hinzufügen',
    'item.brand': 'Marke',
    'item.category': 'Kategorie',
    'item.dimensions': 'Abmessungen',
    'item.price': 'Preis pro m²',
    'item.location': 'Standort',
    'item.createdAt': 'Erstellt am',
    'item.code': 'Code',
    'item.actions': 'Aktionen',
    'units.meters': 'Meter',
    'units.inches': 'Zoll',
    'consumption.record': 'Verbrauch erfassen'
  },
  fr: {
    'app.title': 'Système de Suivi QR',
    'nav.home': 'Accueil',
    'nav.scanner': 'Scanner',
    'nav.inventory': 'Inventaire',
    'common.back': 'Retour',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.add': 'Ajouter',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.search': 'Rechercher...',
    'auth.login': 'Connexion',
    'auth.logout': 'Déconnexion',
    'auth.welcome': 'Bienvenue!',
    'auth.loginSuccess': 'Connexion réussie',
    'auth.accessBlocked': 'Accès bloqué',
    'auth.accessRevokedMessage': 'Votre accès a été révoqué. Veuillez vous reconnecter.',
    'item.details': 'Détails de l\'article',
    'item.addItem': 'Ajouter un article',
    'item.brand': 'Marque',
    'item.category': 'Catégorie',
    'item.dimensions': 'Dimensions',
    'item.price': 'Prix par m²',
    'item.location': 'Emplacement',
    'item.createdAt': 'Créé le',
    'item.code': 'Code',
    'item.actions': 'Actions',
    'units.meters': 'Mètres',
    'units.inches': 'Pouces',
    'consumption.record': 'Enregistrer la consommation'
  },
  ja: {
    'app.title': 'QR追跡システム',
    'nav.home': 'ホーム',
    'nav.scanner': 'スキャナー',
    'nav.inventory': '在庫',
    'common.back': '戻る',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.add': '追加',
    'common.edit': '編集',
    'common.delete': '削除',
    'common.search': '検索...',
    'auth.login': 'ログイン',
    'auth.logout': 'ログアウト',
    'auth.welcome': 'お帰りなさい！',
    'auth.loginSuccess': 'ログイン成功',
    'auth.accessBlocked': 'アクセスがブロックされました',
    'auth.accessRevokedMessage': 'アクセス権が取り消されました。再度ログインしてください。',
    'item.details': '商品詳細',
    'item.addItem': '商品追加',
    'item.brand': 'ブランド',
    'item.category': 'カテゴリー',
    'item.dimensions': '寸法',
    'item.price': '1平方メートルあたりの価格',
    'item.location': '場所',
    'item.createdAt': '作成日',
    'item.code': 'コード',
    'item.actions': 'アクション',
    'units.meters': 'メートル',
    'units.inches': 'インチ',
    'consumption.record': '使用量を記録'
  },
  ko: {
    'app.title': 'QR 추적 시스템',
    'nav.home': '홈',
    'nav.scanner': '스캐너',
    'nav.inventory': '재고',
    'common.back': '뒤로',
    'common.save': '저장',
    'common.cancel': '취소',
    'common.add': '추가',
    'common.edit': '수정',
    'common.delete': '삭제',
    'common.search': '검색...',
    'auth.login': '로그인',
    'auth.logout': '로그아웃',
    'auth.welcome': '환영합니다!',
    'auth.loginSuccess': '로그인 성공',
    'auth.accessBlocked': '접근 차단됨',
    'auth.accessRevokedMessage': '접근 권한이 취소되었습니다. 다시 로그인해 주세요.',
    'item.details': '물품 상세',
    'item.addItem': '물품 추가',
    'item.brand': '브랜드',
    'item.category': '카테고리',
    'item.dimensions': '크기',
    'item.price': '제곱미터당 가격',
    'item.location': '위치',
    'item.createdAt': '생성일',
    'item.code': '코드',
    'item.actions': '작업',
    'units.meters': '미터',
    'units.inches': '인치',
    'consumption.record': '사용량 기록'
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
