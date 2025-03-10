
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
    'nav.dashboard': 'Dashboard',
    'nav.rollsManagement': 'Rolls Management',
    'nav.scrapsManagement': 'Scraps Management',
    'nav.dashboardDescription': 'Under Development - Coming Q2 2024',
    'nav.rollsDescription': 'Coming Soon - Release Date TBA',
    'nav.scrapsDescription': 'Beta Testing - Available Soon',
    'nav.navigation': 'Navigation',
    // Common
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search...',
    'common.unknownError': 'Unknown error',
    'common.clearFilters': 'Clear Filters',
    'common.actions': 'Actions',
    'common.viewDetails': 'View Details',
    // Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.welcome': 'Welcome back!',
    'auth.loginSuccess': 'Login successful',
    'auth.logoutSuccess': 'Logout successful',
    'auth.disconnected': 'You have been disconnected from the system',
    'auth.logoutError': 'Error during logout',
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
    'item.updatedAt': 'Last Update',
    'item.code': 'Code',
    'item.actions': 'Actions',
    'item.name': 'Product Name',
    'item.materialType': 'Material Type',
    'item.rollSize': 'Roll Size',
    'item.area': 'Square Footage',
    'item.quantity': 'Quantity',
    'item.inventoryStatus': 'Inventory Status',
    'item.productInfo': 'Product Information',
    'item.parentRoll': 'Parent Roll',
    'item.viewParentDetails': 'View Parent Roll Details',
    'item.remnantDetails': 'Remnant Details',
    'item.notFound': 'Item not found',
    'item.roll': 'Roll',
    'item.scrap': 'Scrap',
    'item.scrapOf': 'Scrap of',
    'item.minQuantityWarning': 'Low stock: Minimum quantity is {minQuantity}',
    // Units
    'units.meters': 'Meters',
    'units.inches': 'Inches',
    // Consumption
    'consumption.record': 'Record Usage',
    // User
    'user.active': 'Active User',
    // Contact
    'contact.title': 'Contact Us',
    // Support
    'support.title': 'Support',
    'support.customSoftware': 'Custom Software',
    'support.websiteDev': 'Website Development',
    'support.reportBug': 'Report Bug',
    'support.softwareMessage': 'Hello, I\'m a user with email "{email}". I need a quote for developing a custom tool to manage my business. Looking forward to hearing from you!',
    'support.websiteMessage': 'Hello, I\'m a user with email {email}. I need a quote for developing a website. Looking forward to hearing from you!',
    'support.bugMessage': 'Bug Report from user {email}: I would like to report an issue I encountered while using the application. Here are the details: [Please describe the bug, steps to reproduce, and any relevant information]',
    // Links
    'links.store': 'Los_Pelikooss Store',
    'links.quickLinks': 'Quick Links',
    // QR Code
    'qrcode.download': 'Download QR Code',
    'qrcode.print': 'Print Details',
    
    // Filter
    'filter.all': 'All',
    'filter.category': 'Category',
    'filter.filtersCleared': 'Filters cleared!',
    'filter.filtersApplied': 'Filters applied successfully!',
    'filter.itemsFound': 'items found',
    'filter.lengthRange': 'Length Range',
    'filter.widthRange': 'Width Range',
    'filter.max': 'Max',
    'filter.to': 'to',
    
    // Inventory
    'inventory.noItems': 'No items found. Add some items to get started.',
  },
  pt: {
    // Header
    'app.title': 'Sistema de Rastreamento QR',
    // Navigation
    'nav.home': 'Início',
    'nav.scanner': 'Scanner',
    'nav.inventory': 'Inventário',
    'nav.dashboard': 'Painel de Controle',
    'nav.rollsManagement': 'Gerenciamento de Rolos',
    'nav.scrapsManagement': 'Gerenciamento de Retalhos',
    'nav.dashboardDescription': 'Em Desenvolvimento - Lançamento no 2º Trimestre 2024',
    'nav.rollsDescription': 'Em Breve - Data de Lançamento a ser Anunciada',
    'nav.scrapsDescription': 'Em Fase Beta - Disponível em Breve',
    'nav.navigation': 'Navegação',
    // Common
    'common.back': 'Voltar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.add': 'Adicionar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.search': 'Pesquisar...',
    'common.unknownError': 'Erro desconhecido',
    'common.clearFilters': 'Limpar Filtros',
    'common.actions': 'Ações',
    'common.viewDetails': 'Ver Detalhes',
    // Auth
    'auth.login': 'Entrar',
    'auth.logout': 'Sair',
    'auth.welcome': 'Bem-vindo de volta!',
    'auth.loginSuccess': 'Login realizado com sucesso',
    'auth.logoutSuccess': 'Logout realizado com sucesso',
    'auth.disconnected': 'Você foi desconectado do sistema',
    'auth.logoutError': 'Erro durante o logout',
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
    'item.updatedAt': 'Última Atualização',
    'item.code': 'Código',
    'item.actions': 'Ações',
    'item.name': 'Nome do Produto',
    'item.materialType': 'Tipo de Material',
    'item.rollSize': 'Tamanho do Rolo',
    'item.area': 'Área em m²',
    'item.quantity': 'Quantidade',
    'item.inventoryStatus': 'Status do Inventário',
    'item.productInfo': 'Informações do Produto',
    'item.parentRoll': 'Rolo de Origem',
    'item.viewParentDetails': 'Ver Detalhes do Rolo de Origem',
    'item.remnantDetails': 'Detalhes do Retalho',
    'item.notFound': 'Item não encontrado',
    'item.roll': 'Bobina',
    'item.scrap': 'Retalho',
    'item.scrapOf': 'Retalho de',
    'item.minQuantityWarning': 'Estoque baixo: Quantidade mínima é {minQuantity}',
    // Units
    'units.meters': 'Metros',
    'units.inches': 'Polegadas',
    // Consumption
    'consumption.record': 'Registrar Uso',
    // User
    'user.active': 'Usuário Ativo',
    // Contact
    'contact.title': 'Contate-nos',
    // Support
    'support.title': 'Suporte',
    'support.customSoftware': 'Software Personalizado',
    'support.websiteDev': 'Desenvolvimento de Website',
    'support.reportBug': 'Reportar Bug',
    'support.softwareMessage': 'Olá, sou um usuário com o email "{email}". Preciso de um orçamento para desenvolver uma ferramenta personalizada para gerenciar meu negócio. Aguardo seu retorno!',
    'support.websiteMessage': 'Olá, sou um usuário com o email {email}. Preciso de um orçamento para desenvolver um website. Aguardo seu retorno!',
    'support.bugMessage': 'Relatório de Bug do usuário {email}: Gostaria de reportar um problema que encontrei ao usar o aplicativo. Aqui estão os detalhes: [Por favor, descreva o bug, passos para reproduzir e qualquer informação relevante]',
    // Links
    'links.store': 'Loja Los_Pelikooss',
    'links.quickLinks': 'Links Rápidos',
    // QR Code
    'qrcode.download': 'Baixar QR Code',
    'qrcode.print': 'Imprimir Detalhes',
    
    // Filter
    'filter.all': 'Todos',
    'filter.category': 'Categoria',
    'filter.filtersCleared': 'Filtros limpos!',
    'filter.filtersApplied': 'Filtros aplicados com sucesso!',
    'filter.itemsFound': 'itens encontrados',
    'filter.lengthRange': 'Intervalo de Comprimento',
    'filter.widthRange': 'Intervalo de Largura',
    'filter.max': 'Máx',
    'filter.to': 'até',
    
    // Inventory
    'inventory.noItems': 'Nenhum item encontrado. Adicione itens para começar.',
  },
  es: {
    // Header
    'app.title': 'Sistema de Seguimiento QR',
    // Navigation
    'nav.home': 'Inicio',
    'nav.scanner': 'Escáner',
    'nav.inventory': 'Inventario',
    'nav.dashboard': 'Panel de Control',
    'nav.rollsManagement': 'Gestión de Rollos',
    'nav.scrapsManagement': 'Gestión de Restos',
    'nav.dashboardDescription': 'En Desarrollo - Disponible en Q2 2024',
    'nav.rollsDescription': 'Próximamente - Fecha por Anunciar',
    'nav.scrapsDescription': 'Prueba Beta - Disponible Pronto',
    'nav.navigation': 'Navegación',
    // Common
    'common.back': 'Volver',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.add': 'Añadir',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.search': 'Buscar...',
    'common.unknownError': 'Error desconocido',
    'common.clearFilters': 'Limpiar Filtros',
    'common.actions': 'Acciones',
    'common.viewDetails': 'Ver Detalles',
    // Auth
    'auth.login': 'Iniciar sesión',
    'auth.logout': 'Cerrar sesión',
    'auth.welcome': '¡Bienvenido de nuevo!',
    'auth.loginSuccess': 'Inicio de sesión exitoso',
    'auth.logoutSuccess': 'Cierre de sesión exitoso',
    'auth.disconnected': 'Ha sido desconectado del sistema',
    'auth.logoutError': 'Error durante el cierre de sesión',
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
    'item.updatedAt': 'Última Actualización',
    'item.code': 'Código',
    'item.actions': 'Acciones',
    'item.name': 'Nombre del Producto',
    'item.materialType': 'Tipo de Material',
    'item.rollSize': 'Tamaño del Rollo',
    'item.area': 'Área en m²',
    'item.quantity': 'Cantidad',
    'item.inventoryStatus': 'Estado de Inventario',
    'item.productInfo': 'Información del Producto',
    'item.parentRoll': 'Rollo Principal',
    'item.viewParentDetails': 'Ver Detalles del Rollo Principal',
    'item.remnantDetails': 'Detalles del Resto',
    'item.notFound': 'Artículo no encontrado',
    'item.roll': 'Rollo',
    'item.scrap': 'Resto',
    'item.scrapOf': 'Resto de',
    'item.minQuantityWarning': 'Stock bajo: La cantidad mínima es {minQuantity}',
    // Units
    'units.meters': 'Metros',
    'units.inches': 'Pulgadas',
    // Consumption
    'consumption.record': 'Registrar Uso',
    // User
    'user.active': 'Usuario Activo',
    // Contact
    'contact.title': 'Contáctenos',
    // Support
    'support.title': 'Soporte',
    'support.customSoftware': 'Software Personalizado',
    'support.websiteDev': 'Desarrollo de Sitio Web',
    'support.reportBug': 'Reportar Error',
    'support.softwareMessage': 'Hola, soy un usuario con el correo "{email}". Necesito un presupuesto para desarrollar una herramienta personalizada para gestionar mi negocio. ¡Espero su respuesta!',
    'support.websiteMessage': 'Hola, soy un usuario con el correo {email}. Necesito un presupuesto para desarrollar un sitio web. ¡Espero su respuesta!',
    'support.bugMessage': 'Informe de error del usuario {email}: Me gustaría informar sobre un problema que encontré al usar la aplicación. Aquí están los detalles: [Por favor, describa el error, pasos para reproducirlo y cualquier información relevante]',
    // Links
    'links.store': 'Tienda Los_Pelikooss',
    'links.quickLinks': 'Enlaces Rápidos',
    // QR Code
    'qrcode.download': 'Descargar Código QR',
    'qrcode.print': 'Imprimir Detalles',
    
    // Filter
    'filter.all': 'Todos',
    'filter.category': 'Categoría',
    'filter.filtersCleared': '¡Filtros limpiados!',
    'filter.filtersApplied': '¡Filtros aplicados con éxito!',
    'filter.itemsFound': 'elementos encontrados',
    'filter.lengthRange': 'Rango de Longitud',
    'filter.widthRange': 'Rango de Ancho',
    'filter.max': 'Máx',
    'filter.to': 'hasta',
    
    // Inventory
    'inventory.noItems': 'No se encontraron artículos. Añade algunos artículos para comenzar.',
  },
  zh: {
    // Header
    'app.title': 'QR追踪系统',
    // Navigation
    'nav.home': '首页',
    'nav.scanner': '扫描器',
    'nav.inventory': '库存',
    'nav.dashboard': '仪表盘',
    'nav.rollsManagement': '卷材管理',
    'nav.scrapsManagement': '边角料管理',
    'nav.dashboardDescription': '开发中 - 2024年第二季度上线',
    'nav.rollsDescription': '即将推出 - 发布日期待定',
    'nav.scrapsDescription': 'Beta测试中 - 即将推出',
    'nav.navigation': '导航',
    // Common
    'common.back': '返回',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.add': '添加',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.search': '搜索...',
    'common.unknownError': '未知错误',
    'common.clearFilters': '清除筛选',
    'common.actions': '操作',
    'common.viewDetails': '查看详情',
    // Auth
    'auth.login': '登录',
    'auth.logout': '登出',
    'auth.welcome': '欢迎回来！',
    'auth.loginSuccess': '登录成功',
    'auth.logoutSuccess': '登出成功',
    'auth.disconnected': '您已断开与系统的连接',
    'auth.logoutError': '登出过程中出错',
    'auth.accessBlocked': '访问被阻止',
    'auth.accessRevokedMessage': '您的访问权限已被撤销。请重新登录。',
    // Items
    'item.details': '物品详情',
    'item.addItem': '添加物品',
    'item.brand': '品牌',
    'item.category': '类别',
    'item.dimensions': '尺寸',
    'item.price': '每平方米价格',
    'item.location': '位置',
    'item.createdAt': '创建于',
    'item.updatedAt': '最后更新',
    'item.code': '代码',
    'item.actions': '操作',
    'item.name': '产品名称',
    'item.materialType': '材料类型',
    'item.rollSize': '卷材尺寸',
    'item.area': '面积（平方米）',
    'item.quantity': '数量',
    'item.inventoryStatus': '库存状态',
    'item.productInfo': '产品信息',
    'item.parentRoll': '父卷材',
    'item.viewParentDetails': '查看父卷材详情',
    'item.remnantDetails': '边角料详情',
    'item.notFound': '未找到物品',
    'item.roll': '卷材',
    'item.scrap': '边角料',
    'item.scrapOf': '边角料来源',
    'item.minQuantityWarning': '库存不足：最低库存为 {minQuantity}',
    // Units
    'units.meters': '米',
    'units.inches': '英寸',
    // Consumption
    'consumption.record': '记录使用量',
    // User
    'user.active': '活跃用户',
    // Contact
    'contact.title': '联系我们',
    // Support
    'support.title': '支持',
    'support.customSoftware': '定制软件',
    'support.websiteDev': '网站开发',
    'support.reportBug': '报告错误',
    'support.softwareMessage': '您好，我是邮箱为"{email}"的用户。我需要一个开发自定义业务管理工具的报价。期待您的回复！',
    'support.websiteMessage': '您好，我是邮箱为{email}的用户。我需要一个网站开发的报价。期待您的回复！',
    'support.bugMessage': '来自用户{email}的错误报告：我想报告在使用应用程序时遇到的问题。以下是详细信息：[请描述错误、重现步骤和任何相关信息]',
    // Links
    'links.store': 'Los_Pelikooss商店',
    'links.quickLinks': '快速链接',
    // QR Code
    'qrcode.download': '下载二维码',
    'qrcode.print': '打印详情',
    
    // Filter
    'filter.all': '全部',
    'filter.category': '类别',
    'filter.filtersCleared': '筛选已清除！',
    'filter.filtersApplied': '筛选成功应用！',
    'filter.itemsFound': '项目已找到',
    'filter.lengthRange': '长度范围',
    'filter.widthRange': '宽度范围',
    'filter.max': '最大',
    'filter.to': '至',
    
    // Inventory
    'inventory.noItems': '未找到物品。添加一些物品以开始使用。',
  },
  ar: {
    // Header
    'app.title': 'نظام تتبع QR',
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.scanner': 'الماسح',
    'nav.inventory': 'المخزون',
    'nav.dashboard': 'لوحة التحكم',
    'nav.rollsManagement': 'إدارة اللفائف',
    'nav.scrapsManagement': 'إدارة القصاصات',
    'nav.dashboardDescription': 'قيد التطوير - متوفر في الربع الثاني 2024',
    'nav.rollsDescription': 'قريباً - تاريخ الإصدار سيتم الإعلان عنه',
    'nav.scrapsDescription': 'اختبار بيتا - متاح قريباً',
    'nav.navigation': 'التنقل',
    // Common
    'common.back': 'رجوع',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.add': 'إضافة',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث...',
    'common.unknownError': 'خطأ غير معروف',
    'common.clearFilters': 'مسح الفلاتر',
    'common.actions': 'إجراءات',
    'common.viewDetails': 'عرض التفاصيل',
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'auth.welcome': 'مرحباً بعودتك!',
    'auth.loginSuccess': 'تم تسجيل الدخول بنجاح',
    'auth.logoutSuccess': 'تم تسجيل الخروج بنجاح',
    'auth.disconnected': 'تم قطع اتصالك بالنظام',
    'auth.logoutError': 'خطأ أثناء تسجيل الخروج',
    'auth.accessBlocked': 'تم حظر الوصول',
    'auth.accessRevokedMessage': 'تم إلغاء صلاحية وصولك. الرجاء تسجيل الدخول مرة أخرى.',
    // Items
    'item.details': 'تفاصيل المنتج',
    'item.addItem': 'إضافة منتج',
    'item.brand': 'العلامة التجارية',
    'item.category': 'الفئة',
    'item.dimensions': 'الأبعاد',
    'item.price': 'السعر لكل متر مربع',
    'item.location': 'الموقع',
    'item.createdAt': 'تم الإنشاء في',
    'item.updatedAt': 'آخر تحديث',
    'item.code': 'الرمز',
    'item.actions': 'الإجراءات',
    'item.name': 'اسم المنتج',
    'item.materialType': 'نوع المادة',
    'item.rollSize': 'حجم اللفة',
    'item.area': 'المساحة بالمتر المربع',
    'item.quantity': 'الكمية',
    'item.inventoryStatus': 'حالة المخزون',
    'item.productInfo': 'معلومات المنتج',
    'item.parentRoll': 'اللفة الأصلية',
    'item.viewParentDetails': 'عرض تفاصيل اللفة الأصلية',
    'item.remnantDetails': 'تفاصيل القصاصة',
    'item.notFound': 'لم يتم العثور على المنتج',
    'item.roll': 'لفة',
    'item.scrap': 'قصاصة',
    'item.scrapOf': 'قصاصة من',
    'item.minQuantityWarning': 'المخزون منخفض: الحد الأدنى للكمية هو {minQuantity}',
    // Units
    'units.meters': 'متر',
    'units.inches': 'بوصة',
    // Consumption
    'consumption.record': 'تسجيل الاستهلاك',
    // User
    'user.active': 'مستخدم نشط',
    // Contact
    'contact.title': 'اتصل بنا',
    // Support
    'support.title': 'الدعم',
    'support.customSoftware': 'برمجيات مخصصة',
    'support.websiteDev': 'تطوير مواقع الويب',
    'support.reportBug': 'الإبلاغ عن خطأ',
    'support.softwareMessage': 'مرحباً، أنا مستخدم بالبريد الإلكتروني "{email}". أحتاج إلى عرض سعر لتطوير أداة مخصصة لإدارة أعمالي. أتطلع للسماع منكم!',
    'support.websiteMessage': 'مرحباً، أنا مستخدم بالبريد الإلكتروني {email}. أحتاج إلى عرض سعر لتطوير موقع ويب. أتطلع للسماع منكم!',
    'support.bugMessage': 'تقرير خطأ من المستخدم {email}: أود الإبلاغ عن مشكلة واجهتها أثناء استخدام التطبيق. إليك التفاصيل: [يرجى وصف الخطأ وخطوات التكرار وأي معلومات ذات صلة]',
    // Links
    'links.store': 'متجر Los_Pelikooss',
    'links.quickLinks': 'روابط سريعة',
    // QR Code
    'qrcode.download': 'تنزيل رمز QR',
    'qrcode.print': 'طباعة التفاصيل',
    
    // Filter
    'filter.all': 'الكل',
    'filter.category': 'الفئة',
    'filter.filtersCleared': 'تم مسح عوامل التصفية!',
    'filter.filtersApplied': 'تم تطبيق عوامل التصفية بنجاح!',
    'filter.itemsFound': 'تم العثور على العناصر',
    'filter.lengthRange': 'نطاق الطول',
    'filter.widthRange': 'نطاق العرض',
    'filter.max': 'الحد الأقصى',
    'filter.to': 'إلى',
    
    // Inventory
    'inventory.noItems': 'لم يتم العثور على عناصر. أضف بعض العناصر للبدء.',
  },
  de: {
    // Header
    'app.title': 'QR-Tracking-System',
    // Navigation
    'nav.home': 'Startseite',
    'nav.scanner': 'Scanner',
    'nav.inventory': 'Inventar',
    'nav.dashboard': 'Dashboard',
    'nav.rollsManagement': 'Rollenverwaltung',
    'nav.scrapsManagement': 'Restverwaltung',
    'nav.dashboardDescription': 'In Entwicklung - Verfügbar ab Q2 2024',
    'nav.rollsDescription': 'Demnächst - Erscheinungsdatum wird bekannt gegeben',
    'nav.scrapsDescription': 'Beta-Test - Bald verfügbar',
    'nav.navigation': 'Navigation',
    // Common
    'common.back': 'Zurück',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.add': 'Hinzufügen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.search': 'Suchen...',
    'common.unknownError': 'Unbekannter Fehler',
    'common.clearFilters': 'Filter löschen',
    'common.actions': 'Aktionen',
    'common.viewDetails': 'Details anzeigen',
    // Auth
    'auth.login': 'Anmelden',
    'auth.logout': 'Abmelden',
    'auth.welcome': 'Willkommen zurück!',
    'auth.loginSuccess': 'Anmeldung erfolgreich',
    'auth.logoutSuccess': 'Abmeldung erfolgreich',
    'auth.disconnected': 'Sie wurden vom System getrennt',
    'auth.logoutError': 'Fehler beim Abmelden',
    'auth.accessBlocked': 'Zugriff blockiert',
    'auth.accessRevokedMessage': 'Ihr Zugriff wurde widerrufen. Bitte melden Sie sich erneut an.',
    // Items
    'item.details': 'Artikeldetails',
    'item.addItem': 'Artikel hinzufügen',
    'item.brand': 'Marke',
    'item.category': 'Kategorie',
    'item.dimensions': 'Abmessungen',
    'item.price': 'Preis pro m²',
    'item.location': 'Standort',
    'item.createdAt': 'Erstellt am',
    'item.updatedAt': 'Letztes Update',
    'item.code': 'Code',
    'item.actions': 'Aktionen',
    'item.name': 'Produktname',
    'item.materialType': 'Materialtyp',
    'item.rollSize': 'Rollengröße',
    'item.area': 'Fläche in m²',
    'item.quantity': 'Menge',
    'item.inventoryStatus': 'Bestandsstatus',
    'item.productInfo': 'Produktinformationen',
    'item.parentRoll': 'Hauptrolle',
    'item.viewParentDetails': 'Hauptrollendetails anzeigen',
    'item.remnantDetails': 'Restdetails',
    'item.notFound': 'Artikel nicht gefunden',
    'item.roll': 'Rolle',
    'item.scrap': 'Rest',
    'item.scrapOf': 'Rest von',
    'item.minQuantityWarning': 'Niedriger Lagerbestand: Mindestmenge ist {minQuantity}',
    // Units
    'units.meters': 'Meter',
    'units.inches': 'Zoll',
    // Consumption
    'consumption.record': 'Verbrauch erfassen',
    // User
    'user.active': 'Aktiver Benutzer',
    // Contact
    'contact.title': 'Kontaktieren Sie uns',
    // Support
    'support.title': 'Support',
    'support.customSoftware': 'Maßgeschneiderte Software',
    'support.websiteDev': 'Website-Entwicklung',
    'support.reportBug': 'Fehler melden',
    'support.softwareMessage': 'Hallo, ich bin ein Benutzer mit der E-Mail "{email}". Ich benötige ein Angebot für die Entwicklung eines maßgeschneiderten Tools zur Verwaltung meines Unternehmens. Ich freue mich auf Ihre Rückmeldung!',
    'support.websiteMessage': 'Hallo, ich bin ein Benutzer mit der E-Mail {email}. Ich benötige ein Angebot für die Entwicklung einer Website. Ich freue mich auf Ihre Rückmeldung!',
    'support.bugMessage': 'Fehlerbericht von Benutzer {email}: Ich möchte einen Fehler melden, den ich bei der Nutzung der Anwendung festgestellt habe. Hier sind die Details: [Bitte beschreiben Sie den Fehler, Schritte zur Reproduktion und alle relevanten Informationen]',
    // Links
    'links.store': 'Los_Pelikooss Shop',
    'links.quickLinks': 'Schnelllinks',
    // QR Code
    'qrcode.download': 'QR-Code herunterladen',
    'qrcode.print': 'Details drucken',
    
    // Filter
    'filter.all': 'Alle',
    'filter.category': 'Kategorie',
    'filter.filtersCleared': 'Filter gelöscht!',
    'filter.filtersApplied': 'Filter erfolgreich angewendet!',
    'filter.itemsFound': 'Elemente gefunden',
    'filter.lengthRange': 'Längenbereich',
    'filter.widthRange': 'Breitenbereich',
    'filter.max': 'Max',
    'filter.to': 'bis',
    
    // Inventory
    'inventory.noItems': 'Keine Artikel gefunden. Fügen Sie einige Artikel hinzu, um zu beginnen.',
  },
  fr: {
    // Header
    'app.title': 'Système de Suivi QR',
    // Navigation
    'nav.home': 'Accueil',
    'nav.scanner': 'Scanner',
    'nav.inventory': 'Inventaire',
    'nav.dashboard': 'Tableau de Bord',
    'nav.rollsManagement': 'Gestion des Rouleaux',
    'nav.scrapsManagement': 'Gestion des Chutes',
    'nav.dashboardDescription': 'En développement - Disponible au 2e trimestre 2024',
    'nav.rollsDescription': 'Bientôt disponible - Date de sortie à annoncer',
    'nav.scrapsDescription': 'Test Bêta - Bientôt disponible',
    'nav.navigation': 'Navigation',
    // Common
    'common.back': 'Retour',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.add': 'Ajouter',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.search': 'Rechercher...',
    'common.unknownError': 'Erreur inconnue',
    'common.clearFilters': 'Effacer les filtres',
    'common.actions': 'Actions',
    'common.viewDetails': 'Voir les détails',
    // Auth
    'auth.login': 'Connexion',
    'auth.logout': 'Déconnexion',
    'auth.welcome': 'Bienvenue!',
    'auth.loginSuccess': 'Connexion réussie',
    'auth.logoutSuccess': 'Déconnexion réussie',
    'auth.disconnected': 'Vous avez été déconnecté du système',
    'auth.logoutError': 'Erreur lors de la déconnexion',
    'auth.accessBlocked': 'Accès bloqué',
    'auth.accessRevokedMessage': 'Votre accès a été révoqué. Veuillez vous reconnecter.',
    // Items
    'item.details': 'Détails de l\'article',
    'item.addItem': 'Ajouter un article',
    'item.brand': 'Marque',
    'item.category': 'Catégorie',
    'item.dimensions': 'Dimensions',
    'item.price': 'Prix par m²',
    'item.location': 'Emplacement',
    'item.createdAt': 'Créé le',
    'item.updatedAt': 'Dernière mise à jour',
    'item.code': 'Code',
    'item.actions': 'Actions',
    'item.name': 'Nom du produit',
    'item.materialType': 'Type de matériau',
    'item.rollSize': 'Taille du rouleau',
    'item.area': 'Surface en m²',
    'item.quantity': 'Quantité',
    'item.inventoryStatus': 'État de l\'inventaire',
    'item.productInfo': 'Informations sur le produit',
    'item.parentRoll': 'Rouleau parent',
    'item.viewParentDetails': 'Voir les détails du rouleau parent',
    'item.remnantDetails': 'Détails du reste',
    'item.notFound': 'Article non trouvé',
    'item.roll': 'Rouleau',
    'item.scrap': 'Chute',
    'item.scrapOf': 'Chute de',
    'item.minQuantityWarning': 'Stock bas: La quantité minimale est {minQuantity}',
    // Units
    'units.meters': 'Mètres',
    'units.inches': 'Pouces',
    // Consumption
    'consumption.record': 'Enregistrer l\'utilisation',
    // User
    'user.active': 'Utilisateur actif',
    // Contact
    'contact.title': 'Contactez-nous',
    // Support
    'support.title': 'Support',
    'support.customSoftware': 'Logiciel personnalisé',
    'support.websiteDev': 'Développement de site web',
    'support.reportBug': 'Signaler un bug',
    'support.softwareMessage': 'Bonjour, je suis un utilisateur avec l\'e-mail "{email}". J\'ai besoin d\'un devis pour développer un outil personnalisé pour gérer mon entreprise. J\'attends votre réponse!',
    'support.websiteMessage': 'Bonjour, je suis un utilisateur avec l\'e-mail {email}. J\'ai besoin d\'un devis pour développer un site web. J\'attends votre réponse!',
    'support.bugMessage': 'Rapport de bug de l\'utilisateur {email}: Je voudrais signaler un problème que j\'ai rencontré lors de l\'utilisation de l\'application. Voici les détails: [Veuillez décrire le bug, les étapes pour le reproduire et toute information pertinente]',
    // Links
    'links.store': 'Boutique Los_Pelikooss',
    'links.quickLinks': 'Liens rapides',
    // QR Code
    'qrcode.download': 'Télécharger le QR Code',
    'qrcode.print': 'Imprimer les détails',
    
    // Filter
    'filter.all': 'Tous',
    'filter.category': 'Catégorie',
    'filter.filtersCleared': 'Filtres effacés!',
    'filter.filtersApplied': 'Filtres appliqués avec succès!',
    'filter.itemsFound': 'éléments trouvés',
    'filter.lengthRange': 'Plage de longueur',
    'filter.widthRange': 'Plage de largeur',
    'filter.max': 'Max',
    'filter.to': 'à',
    
    // Inventory
    'inventory.noItems': 'Aucun élément trouvé. Ajoutez des éléments pour commencer.',
  },
  ja: {
    // Header
    'app.title': 'QRトラッキングシステム',
    // Navigation
    'nav.home': 'ホーム',
    'nav.scanner': 'スキャナー',
    'nav.inventory': '在庫',
    'nav.dashboard': 'ダッシュボード',
    'nav.rollsManagement': 'ロール管理',
    'nav.scrapsManagement': '端材管理',
    'nav.dashboardDescription': '開発中 - 2024年第2四半期リリース予定',
    'nav.rollsDescription': '近日公開 - 発売日は後日発表',
    'nav.scrapsDescription': 'ベータテスト中 - まもなく利用可能',
    'nav.navigation': 'ナビゲーション',
    // Common
    'common.back': '戻る',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.add': '追加',
    'common.edit': '編集',
    'common.delete': '削除',
    'common.search': '検索...',
    'common.unknownError': '不明なエラー',
    'common.clearFilters': 'フィルターをクリア',
    'common.actions': 'アクション',
    'common.viewDetails': '詳細を表示',
    // Auth
    'auth.login': 'ログイン',
    'auth.logout': 'ログアウト',
    'auth.welcome': 'おかえりなさい！',
    'auth.loginSuccess': 'ログイン成功',
    'auth.logoutSuccess': 'ログアウト成功',
    'auth.disconnected': 'システムから切断されました',
    'auth.logoutError': 'ログアウト中にエラーが発生しました',
    'auth.accessBlocked': 'アクセスがブロックされました',
    'auth.accessRevokedMessage': 'アクセス権が取り消されました。再度ログインしてください。',
    // Items
    'item.details': 'アイテム詳細',
    'item.addItem': 'アイテムを追加',
    'item.brand': 'ブランド',
    'item.category': 'カテゴリー',
    'item.dimensions': '寸法',
    'item.price': '平方メートルあたりの価格',
    'item.location': '場所',
    'item.createdAt': '作成日',
    'item.updatedAt': '最終更新',
    'item.code': 'コード',
    'item.actions': 'アクション',
    'item.name': '製品名',
    'item.materialType': '材料タイプ',
    'item.rollSize': 'ロールサイズ',
    'item.area': '面積（平方メートル）',
    'item.quantity': '数量',
    'item.inventoryStatus': '在庫状況',
    'item.productInfo': '製品情報',
    'item.parentRoll': '親ロール',
    'item.viewParentDetails': '親ロールの詳細を表示',
    'item.remnantDetails': '端材の詳細',
    'item.notFound': 'アイテムが見つかりません',
    'item.roll': 'ロール',
    'item.scrap': '端材',
    'item.scrapOf': 'の端材',
    'item.minQuantityWarning': '在庫が少なくなっています：最小数量は {minQuantity} です',
    // Units
    'units.meters': 'メートル',
    'units.inches': 'インチ',
    // Consumption
    'consumption.record': '使用を記録',
    // User
    'user.active': 'アクティブユーザー',
    // Contact
    'contact.title': 'お問い合わせ',
    // Support
    'support.title': 'サポート',
    'support.customSoftware': 'カスタムソフトウェア',
    'support.websiteDev': 'ウェブサイト開発',
    'support.reportBug': 'バグを報告',
    'support.softwareMessage': 'こんにちは、メールアドレスが「{email}」のユーザーです。私のビジネスを管理するためのカスタムツール開発の見積もりが必要です。ご連絡をお待ちしています！',
    'support.websiteMessage': 'こんにちは、メールアドレスが{email}のユーザーです。ウェブサイト開発の見積もりが必要です。ご連絡をお待ちしています！',
    'support.bugMessage': 'ユーザー{email}からのバグレポート：アプリケーション使用中に発生した問題を報告したいと思います。詳細は以下の通りです：[バグの説明、再現手順、およびその他の関連情報を記入してください]',
    // Links
    'links.store': 'Los_Pelikoossストア',
    'links.quickLinks': 'クイックリンク',
    // QR Code
    'qrcode.download': 'QRコードをダウンロード',
    'qrcode.print': '詳細を印刷',
    
    // Filter
    'filter.all': 'すべて',
    'filter.category': 'カテゴリー',
    'filter.filtersCleared': 'フィルターがクリアされました！',
    'filter.filtersApplied': 'フィルターが正常に適用されました！',
    'filter.itemsFound': 'アイテムが見つかりました',
    'filter.lengthRange': '長さ範囲',
    'filter.widthRange': '幅範囲',
    'filter.max': '最大',
    'filter.to': 'から',
    
    // Inventory
    'inventory.noItems': 'アイテムが見つかりません。始めるにはいくつかのアイテムを追加してください。',
  },
  ko: {
    // Header
    'app.title': 'QR 추적 시스템',
    // Navigation
    'nav.home': '홈',
    'nav.scanner': '스캐너',
    'nav.inventory': '재고',
    'nav.dashboard': '대시보드',
    'nav.rollsManagement': '롤 관리',
    'nav.scrapsManagement': '스크랩 관리',
    'nav.dashboardDescription': '개발 중 - 2024년 2분기 출시 예정',
    'nav.rollsDescription': '출시 예정 - 출시일 추후 공지',
    'nav.scrapsDescription': '베타 테스트 중 - 곧 이용 가능',
    'nav.navigation': '탐색',
    // Common
    'common.back': '뒤로',
    'common.save': '저장',
    'common.cancel': '취소',
    'common.add': '추가',
    'common.edit': '편집',
    'common.delete': '삭제',
    'common.search': '검색...',
    'common.unknownError': '알 수 없는 오류',
    'common.clearFilters': '필터 지우기',
    'common.actions': '작업',
    'common.viewDetails': '세부 정보 보기',
    // Auth
    'auth.login': '로그인',
    'auth.logout': '로그아웃',
    'auth.welcome': '환영합니다!',
    'auth.loginSuccess': '로그인 성공',
    'auth.logoutSuccess': '로그아웃 성공',
    'auth.disconnected': '시스템에서 연결이 끊겼습니다',
    'auth.logoutError': '로그아웃 중 오류 발생',
    'auth.accessBlocked': '접근 차단됨',
    'auth.accessRevokedMessage': '접근 권한이 취소되었습니다. 다시 로그인하세요.',
    // Items
    'item.details': '아이템 세부 정보',
    'item.addItem': '아이템 추가',
    'item.brand': '브랜드',
    'item.category': '카테고리',
    'item.dimensions': '치수',
    'item.price': '평방미터당 가격',
    'item.location': '위치',
    'item.createdAt': '생성일',
    'item.updatedAt': '마지막 업데이트',
    'item.code': '코드',
    'item.actions': '작업',
    'item.name': '제품명',
    'item.materialType': '재질 유형',
    'item.rollSize': '롤 크기',
    'item.area': '면적(평방미터)',
    'item.quantity': '수량',
    'item.inventoryStatus': '재고 상태',
    'item.productInfo': '제품 정보',
    'item.parentRoll': '부모 롤',
    'item.viewParentDetails': '부모 롤 세부 정보 보기',
    'item.remnantDetails': '잔여물 세부 정보',
    'item.notFound': '아이템을 찾을 수 없음',
    'item.roll': '롤',
    'item.scrap': '스크랩',
    'item.scrapOf': '스크랩 출처',
    'item.minQuantityWarning': '재고 부족: 최소 수량은 {minQuantity}입니다',
    // Units
    'units.meters': '미터',
    'units.inches': '인치',
    // Consumption
    'consumption.record': '사용량 기록',
    // User
    'user.active': '활성 사용자',
    // Contact
    'contact.title': '문의하기',
    // Support
    'support.title': '지원',
    'support.customSoftware': '맞춤형 소프트웨어',
    'support.websiteDev': '웹사이트 개발',
    'support.reportBug': '버그 신고',
    'support.softwareMessage': '안녕하세요, 이메일이 "{email}"인 사용자입니다. 제 비즈니스를 관리하기 위한 맞춤형 도구 개발에 대한 견적이 필요합니다. 연락 기다리겠습니다!',
    'support.websiteMessage': '안녕하세요, 이메일이 {email}인 사용자입니다. 웹사이트 개발에 대한 견적이 필요합니다. 연락 기다리겠습니다!',
    'support.bugMessage': '사용자 {email}의 버그 신고: 애플리케이션 사용 중 발생한 문제를 신고하고 싶습니다. 세부 정보는 다음과 같습니다: [버그에 대한 설명, 재현 단계 및 관련 정보를 입력하세요]',
    // Links
    'links.store': 'Los_Pelikooss 스토어',
    'links.quickLinks': '빠른 링크',
    // QR Code
    'qrcode.download': 'QR 코드 다운로드',
    'qrcode.print': '세부 정보 인쇄',
    
    // Filter
    'filter.all': '전체',
    'filter.category': '카테고리',
    'filter.filtersCleared': '필터가 지워졌습니다!',
    'filter.filtersApplied': '필터가 성공적으로 적용되었습니다!',
    'filter.itemsFound': '항목 찾음',
    'filter.lengthRange': '길이 범위',
    'filter.widthRange': '너비 범위',
    'filter.max': '최대',
    'filter.to': '~',
    
    // Inventory
    'inventory.noItems': '아이템을 찾을 수 없습니다. 시작하려면 몇 가지 아이템을 추가하세요.',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get the language from localStorage, default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Get translation for a given key
  const t = (key: string): string => {
    const lang = translations[language] || translations.en;
    return lang[key as keyof typeof lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
