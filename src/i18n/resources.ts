export const defaultLanguage = "en";

export const resources = {
  en: {
    translation: {
      appName: "Fresh Pump",
      dashboard: "Dashboard",
      pumps: "Pumps",
      tanks: "Tanks",
      sales: "Sales",
      expenses: "Expenses",
      inventory: "Inventory",
      reports: "Reports",
      analytics: "Analytics",
      staff: "Staff",
      billing: "Billing",
      settings: "Settings",
      support: "Support",
      loginTitle: "Welcome back to Fresh Pump",
      loginSubtitle:
        "Manage pumps, tanks, attendants, inventory, and branch operations from a single cloud control center.",
    },
  },
  fr: {
    translation: {
      appName: "Fresh Pump",
      dashboard: "Tableau de bord",
      pumps: "Pompes",
      tanks: "Cuves",
      sales: "Ventes",
      expenses: "Depenses",
      inventory: "Inventaire",
      reports: "Rapports",
      analytics: "Analytique",
      staff: "Personnel",
      billing: "Facturation",
      settings: "Parametres",
      support: "Support",
      loginTitle: "Bienvenue sur Fresh Pump",
      loginSubtitle:
        "Supervisez pompes, cuves, personnel et activites multi-branches depuis une seule plateforme cloud.",
    },
  },
  ar: {
    translation: {
      appName: "Fresh Pump",
      dashboard: "لوحة التحكم",
      pumps: "المضخات",
      tanks: "الخزانات",
      sales: "المبيعات",
      expenses: "المصروفات",
      inventory: "المخزون",
      reports: "التقارير",
      analytics: "التحليلات",
      staff: "الموظفون",
      billing: "الفواتير",
      settings: "الاعدادات",
      support: "الدعم",
      loginTitle: "مرحبا بعودتك إلى Fresh Pump",
      loginSubtitle:
        "ادِر المضخات والخزانات والموظفين والمخزون والفروع من منصة تشغيل سحابية واحدة.",
    },
  },
  pt: {
    translation: {
      appName: "Fresh Pump",
      dashboard: "Painel",
      pumps: "Bombas",
      tanks: "Tanques",
      sales: "Vendas",
      expenses: "Despesas",
      inventory: "Inventario",
      reports: "Relatorios",
      analytics: "Analitica",
      staff: "Equipe",
      billing: "Faturamento",
      settings: "Configuracoes",
      support: "Suporte",
      loginTitle: "Bem-vindo de volta ao Fresh Pump",
      loginSubtitle:
        "Gerencie bombas, tanques, equipe, inventario e operacoes multi-filial em uma unica plataforma.",
    },
  },
  es: {
    translation: {
      appName: "Fresh Pump",
      dashboard: "Panel",
      pumps: "Bombas",
      tanks: "Tanques",
      sales: "Ventas",
      expenses: "Gastos",
      inventory: "Inventario",
      reports: "Reportes",
      analytics: "Analitica",
      staff: "Personal",
      billing: "Facturacion",
      settings: "Configuracion",
      support: "Soporte",
      loginTitle: "Bienvenido de nuevo a Fresh Pump",
      loginSubtitle:
        "Administra bombas, tanques, personal, inventario y sucursales desde una sola plataforma inteligente.",
    },
  },
} as const;

export type SupportedLanguage = keyof typeof resources;

export const supportedLanguages = Object.keys(resources) as SupportedLanguage[];
export const supportedCurrencies = ["NGN", "USD", "EUR", "GBP", "GHS", "KES"] as const;

export type SupportedCurrency = (typeof supportedCurrencies)[number];