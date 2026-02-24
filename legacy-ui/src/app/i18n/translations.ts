export type Language = 'en' | 'pt-BR' | 'es';

export interface Translations {
  // Common
  'common.save': string;
  'common.cancel': string;
  'common.delete': string;
  'common.edit': string;
  'common.search': string;
  'common.loading': string;
  'common.error': string;
  'common.success': string;
  'common.close': string;
  'common.continue': string;
  'common.back': string;
  
  // Header
  'header.courses': string;
  'header.leaderboard': string;
  'header.identity': string;
  'header.dashboard': string;
  'header.settings': string;
  'header.home': string;
  
  // Language Switcher
  'language.english': string;
  'language.portuguese': string;
  'language.spanish': string;
  'language.current': string;
  
  // Leaderboard
  'leaderboard.title': string;
  'leaderboard.subtitle': string;
  'leaderboard.weekly': string;
  'leaderboard.monthly': string;
  'leaderboard.allTime': string;
  'leaderboard.filterByTrack': string;
  'leaderboard.allTracks': string;
  'leaderboard.rank': string;
  'leaderboard.user': string;
  'leaderboard.wallet': string;
  'leaderboard.xp': string;
  'leaderboard.level': string;
  'leaderboard.streak': string;
  'leaderboard.you': string;
  'leaderboard.updateNote': string;
  'leaderboard.loading': string;
  'leaderboard.empty': string;
  'leaderboard.emptyMessage': string;
  'leaderboard.showing': string;
  'leaderboard.learners': string;
  
  // Settings
  'settings.title': string;
  'settings.subtitle': string;
  'settings.tabs.profile': string;
  'settings.tabs.accounts': string;
  'settings.tabs.preferences': string;
  'settings.tabs.notifications': string;
  'settings.tabs.privacy': string;
  
  // Settings - Profile
  'settings.profile.title': string;
  'settings.profile.picture': string;
  'settings.profile.changePhoto': string;
  'settings.profile.fullName': string;
  'settings.profile.username': string;
  'settings.profile.bio': string;
  'settings.profile.twitter': string;
  'settings.profile.github': string;
  'settings.profile.saveChanges': string;
  
  // Settings - Accounts
  'settings.accounts.title': string;
  'settings.accounts.solanaWallet': string;
  'settings.accounts.disconnect': string;
  'settings.accounts.connect': string;
  'settings.accounts.notConnected': string;
  
  // Settings - Preferences
  'settings.preferences.title': string;
  'settings.preferences.language': string;
  'settings.preferences.languageDesc': string;
  'settings.preferences.theme': string;
  'settings.preferences.themeLight': string;
  'settings.preferences.themeDark': string;
  'settings.preferences.themeSystem': string;
  'settings.preferences.devMode': string;
  'settings.preferences.devModeDesc': string;
  
  // Settings - Notifications
  'settings.notifications.title': string;
  'settings.notifications.email': string;
  'settings.notifications.emailDesc': string;
  'settings.notifications.push': string;
  'settings.notifications.pushDesc': string;
  'settings.notifications.courseUpdates': string;
  'settings.notifications.courseUpdatesDesc': string;
  'settings.notifications.achievements': string;
  'settings.notifications.achievementsDesc': string;
  
  // Settings - Privacy
  'settings.privacy.title': string;
  'settings.privacy.publicProfile': string;
  'settings.privacy.publicProfileDesc': string;
  'settings.privacy.leaderboard': string;
  'settings.privacy.leaderboardDesc': string;
  'settings.privacy.activity': string;
  'settings.privacy.activityDesc': string;
  'settings.privacy.dataManagement': string;
  'settings.privacy.downloadData': string;
  'settings.privacy.downloadDataDesc': string;
  'settings.privacy.deleteAccount': string;
  'settings.privacy.deleteAccountDesc': string;
  
  // Wallet
  'wallet.connect': string;
  'wallet.disconnect': string;
  'wallet.connected': string;
  'wallet.balance': string;
}

export const translations: Record<Language, Translations> = {
  'en': {
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.continue': 'Continue',
    'common.back': 'Back',
    
    // Header
    'header.courses': 'Courses',
    'header.leaderboard': 'Leaderboard',
    'header.identity': 'Identity',
    'header.dashboard': 'Dashboard',
    'header.settings': 'Settings',
    'header.home': 'Home',
    
    // Language Switcher
    'language.english': 'English',
    'language.portuguese': 'Português',
    'language.spanish': 'Español',
    'language.current': 'Language',
    
    // Leaderboard
    'leaderboard.title': 'Leaderboard',
    'leaderboard.subtitle': 'See how you rank among learners',
    'leaderboard.weekly': 'Weekly',
    'leaderboard.monthly': 'Monthly',
    'leaderboard.allTime': 'All Time',
    'leaderboard.filterByTrack': 'Filter by Track',
    'leaderboard.allTracks': 'All Tracks',
    'leaderboard.rank': 'Rank',
    'leaderboard.user': 'User',
    'leaderboard.wallet': 'Wallet',
    'leaderboard.xp': 'XP',
    'leaderboard.level': 'Level',
    'leaderboard.streak': 'Streak',
    'leaderboard.you': 'You',
    'leaderboard.updateNote': 'Leaderboard updates every 15 minutes',
    'leaderboard.loading': 'Loading leaderboard...',
    'leaderboard.empty': 'No learners found',
    'leaderboard.emptyMessage': 'There are no learners in the leaderboard yet. Keep learning to appear here!',
    'leaderboard.showing': 'Showing',
    'leaderboard.learners': 'learners',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage your account settings and preferences',
    'settings.tabs.profile': 'Profile',
    'settings.tabs.accounts': 'Accounts',
    'settings.tabs.preferences': 'Preferences',
    'settings.tabs.notifications': 'Notifications',
    'settings.tabs.privacy': 'Privacy',
    
    // Settings - Profile
    'settings.profile.title': 'Profile Information',
    'settings.profile.picture': 'Profile Picture',
    'settings.profile.changePhoto': 'Change Photo',
    'settings.profile.fullName': 'Full Name',
    'settings.profile.username': 'Username',
    'settings.profile.bio': 'Bio',
    'settings.profile.twitter': 'Twitter',
    'settings.profile.github': 'GitHub',
    'settings.profile.saveChanges': 'Save Changes',
    
    // Settings - Accounts
    'settings.accounts.title': 'Connected Accounts',
    'settings.accounts.solanaWallet': 'Solana Wallet',
    'settings.accounts.disconnect': 'Disconnect',
    'settings.accounts.connect': 'Connect',
    'settings.accounts.notConnected': 'Not connected',
    
    // Settings - Preferences
    'settings.preferences.title': 'Preferences',
    'settings.preferences.language': 'Language',
    'settings.preferences.languageDesc': 'Choose your preferred language for the interface',
    'settings.preferences.theme': 'Theme',
    'settings.preferences.themeLight': 'Light',
    'settings.preferences.themeDark': 'Dark',
    'settings.preferences.themeSystem': 'System',
    'settings.preferences.devMode': 'Developer Mode',
    'settings.preferences.devModeDesc': 'Show translation keys as tooltips for debugging',
    
    // Settings - Notifications
    'settings.notifications.title': 'Notification Preferences',
    'settings.notifications.email': 'Email Notifications',
    'settings.notifications.emailDesc': 'Receive emails about your activity and updates',
    'settings.notifications.push': 'Push Notifications',
    'settings.notifications.pushDesc': 'Receive push notifications in your browser',
    'settings.notifications.courseUpdates': 'Course Updates',
    'settings.notifications.courseUpdatesDesc': 'Notifications about new lessons and courses',
    'settings.notifications.achievements': 'Achievements',
    'settings.notifications.achievementsDesc': 'Get notified when you unlock achievements',
    
    // Settings - Privacy
    'settings.privacy.title': 'Privacy Settings',
    'settings.privacy.publicProfile': 'Public Profile',
    'settings.privacy.publicProfileDesc': 'Make your profile visible to other users',
    'settings.privacy.leaderboard': 'Show on Leaderboard',
    'settings.privacy.leaderboardDesc': 'Display your stats on the global leaderboard',
    'settings.privacy.activity': 'Activity Status',
    'settings.privacy.activityDesc': 'Show when you\'re actively learning',
    'settings.privacy.dataManagement': 'Data Management',
    'settings.privacy.downloadData': 'Download My Data',
    'settings.privacy.downloadDataDesc': 'Export all your learning data and progress',
    'settings.privacy.deleteAccount': 'Delete Account',
    'settings.privacy.deleteAccountDesc': 'Permanently delete your account and all data',
    
    // Wallet
    'wallet.connect': 'Connect Wallet',
    'wallet.disconnect': 'Disconnect',
    'wallet.connected': 'Connected',
    'wallet.balance': 'Balance',
  },
  
  'pt-BR': {
    // Common
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.search': 'Buscar',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.close': 'Fechar',
    'common.continue': 'Continuar',
    'common.back': 'Voltar',
    
    // Header
    'header.courses': 'Cursos',
    'header.leaderboard': 'Ranking',
    'header.identity': 'Identidade',
    'header.dashboard': 'Painel',
    'header.settings': 'Configurações',
    'header.home': 'Início',
    
    // Language Switcher
    'language.english': 'English',
    'language.portuguese': 'Português',
    'language.spanish': 'Español',
    'language.current': 'Idioma',
    
    // Leaderboard
    'leaderboard.title': 'Ranking',
    'leaderboard.subtitle': 'Veja como você se enquadra entre os aprendizes',
    'leaderboard.weekly': 'Semanal',
    'leaderboard.monthly': 'Mensal',
    'leaderboard.allTime': 'Tudo o Tempo',
    'leaderboard.filterByTrack': 'Filtrar por Trilha',
    'leaderboard.allTracks': 'Todas as Trilhas',
    'leaderboard.rank': 'Classificação',
    'leaderboard.user': 'Usuário',
    'leaderboard.wallet': 'Carteira',
    'leaderboard.xp': 'XP',
    'leaderboard.level': 'Nível',
    'leaderboard.streak': 'Sequência',
    'leaderboard.you': 'Você',
    'leaderboard.updateNote': 'O ranking é atualizado a cada 15 minutos',
    'leaderboard.loading': 'Carregando ranking...',
    'leaderboard.empty': 'Nenhum aprendiz encontrado',
    'leaderboard.emptyMessage': 'Ainda não há aprendizes no ranking. Continue aprendendo para aparecer aqui!',
    'leaderboard.showing': 'Mostrando',
    'leaderboard.learners': 'aprendizes',
    
    // Settings
    'settings.title': 'Configurações',
    'settings.subtitle': 'Gerencie suas configurações de conta e preferências',
    'settings.tabs.profile': 'Perfil',
    'settings.tabs.accounts': 'Contas',
    'settings.tabs.preferences': 'Preferências',
    'settings.tabs.notifications': 'Notificações',
    'settings.tabs.privacy': 'Privacidade',
    
    // Settings - Profile
    'settings.profile.title': 'Informações do Perfil',
    'settings.profile.picture': 'Foto de Perfil',
    'settings.profile.changePhoto': 'Alterar Foto',
    'settings.profile.fullName': 'Nome Completo',
    'settings.profile.username': 'Nome de Usuário',
    'settings.profile.bio': 'Biografia',
    'settings.profile.twitter': 'Twitter',
    'settings.profile.github': 'GitHub',
    'settings.profile.saveChanges': 'Salvar Alterações',
    
    // Settings - Accounts
    'settings.accounts.title': 'Contas Conectadas',
    'settings.accounts.solanaWallet': 'Carteira Solana',
    'settings.accounts.disconnect': 'Desconectar',
    'settings.accounts.connect': 'Conectar',
    'settings.accounts.notConnected': 'Não conectado',
    
    // Settings - Preferences
    'settings.preferences.title': 'Preferências',
    'settings.preferences.language': 'Idioma',
    'settings.preferences.languageDesc': 'Escolha seu idioma preferido para a interface',
    'settings.preferences.theme': 'Tema',
    'settings.preferences.themeLight': 'Claro',
    'settings.preferences.themeDark': 'Escuro',
    'settings.preferences.themeSystem': 'Sistema',
    'settings.preferences.devMode': 'Modo de Desenvolvedor',
    'settings.preferences.devModeDesc': 'Mostrar chaves de tradução como dicas de ferramentas para depuração',
    
    // Settings - Notifications
    'settings.notifications.title': 'Preferências de Notificação',
    'settings.notifications.email': 'Notificações por Email',
    'settings.notifications.emailDesc': 'Receba emails sobre suas atividades e atualizações',
    'settings.notifications.push': 'Notificações Push',
    'settings.notifications.pushDesc': 'Receba notificações push em seu navegador',
    'settings.notifications.courseUpdates': 'Atualizações de Cursos',
    'settings.notifications.courseUpdatesDesc': 'Notificações sobre novas aulas e cursos',
    'settings.notifications.achievements': 'Conquistas',
    'settings.notifications.achievementsDesc': 'Receba notificações ao desbloquear conquistas',
    
    // Settings - Privacy
    'settings.privacy.title': 'Configurações de Privacidade',
    'settings.privacy.publicProfile': 'Perfil Público',
    'settings.privacy.publicProfileDesc': 'Torne seu perfil visível para outros usuários',
    'settings.privacy.leaderboard': 'Mostrar no Ranking',
    'settings.privacy.leaderboardDesc': 'Exibir suas estatísticas no ranking global',
    'settings.privacy.activity': 'Status de Atividade',
    'settings.privacy.activityDesc': 'Mostrar quando você está aprendendo ativamente',
    'settings.privacy.dataManagement': 'Gerenciamento de Dados',
    'settings.privacy.downloadData': 'Baixar Meus Dados',
    'settings.privacy.downloadDataDesc': 'Exporte todos os seus dados de aprendizado e progresso',
    'settings.privacy.deleteAccount': 'Excluir Conta',
    'settings.privacy.deleteAccountDesc': 'Exclua permanentemente sua conta e todos os dados',
    
    // Wallet
    'wallet.connect': 'Conectar Carteira',
    'wallet.disconnect': 'Desconectar',
    'wallet.connected': 'Conectado',
    'wallet.balance': 'Saldo',
  },
  
  'es': {
    // Common
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.search': 'Buscar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.close': 'Cerrar',
    'common.continue': 'Continuar',
    'common.back': 'Atrás',
    
    // Header
    'header.courses': 'Cursos',
    'header.leaderboard': 'Clasificación',
    'header.identity': 'Identidad',
    'header.dashboard': 'Panel',
    'header.settings': 'Configuración',
    'header.home': 'Inicio',
    
    // Language Switcher
    'language.english': 'English',
    'language.portuguese': 'Português',
    'language.spanish': 'Español',
    'language.current': 'Idioma',
    
    // Leaderboard
    'leaderboard.title': 'Clasificación',
    'leaderboard.subtitle': 'Ver cómo te clasificas entre los aprendices',
    'leaderboard.weekly': 'Semanal',
    'leaderboard.monthly': 'Mensual',
    'leaderboard.allTime': 'Todo el Tiempo',
    'leaderboard.filterByTrack': 'Filtrar por Ruta',
    'leaderboard.allTracks': 'Todas las Rutas',
    'leaderboard.rank': 'Clasificación',
    'leaderboard.user': 'Usuario',
    'leaderboard.wallet': 'Billetera',
    'leaderboard.xp': 'XP',
    'leaderboard.level': 'Nivel',
    'leaderboard.streak': 'Racha',
    'leaderboard.you': 'Tú',
    'leaderboard.updateNote': 'La clasificación se actualiza cada 15 minutos',
    'leaderboard.loading': 'Cargando clasificación...',
    'leaderboard.empty': 'No se encontraron aprendices',
    'leaderboard.emptyMessage': 'Aún no hay aprendices en la clasificación. ¡Sigue aprendiendo para aparecer aquí!',
    'leaderboard.showing': 'Mostrando',
    'leaderboard.learners': 'aprendices',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.subtitle': 'Administra tu cuenta y preferencias',
    'settings.tabs.profile': 'Perfil',
    'settings.tabs.accounts': 'Cuentas',
    'settings.tabs.preferences': 'Preferencias',
    'settings.tabs.notifications': 'Notificaciones',
    'settings.tabs.privacy': 'Privacidad',
    
    // Settings - Profile
    'settings.profile.title': 'Información del Perfil',
    'settings.profile.picture': 'Foto de Perfil',
    'settings.profile.changePhoto': 'Cambiar Foto',
    'settings.profile.fullName': 'Nombre Completo',
    'settings.profile.username': 'Nombre de Usuario',
    'settings.profile.bio': 'Biografía',
    'settings.profile.twitter': 'Twitter',
    'settings.profile.github': 'GitHub',
    'settings.profile.saveChanges': 'Guardar Cambios',
    
    // Settings - Accounts
    'settings.accounts.title': 'Cuentas Conectadas',
    'settings.accounts.solanaWallet': 'Billetera Solana',
    'settings.accounts.disconnect': 'Desconectar',
    'settings.accounts.connect': 'Conectar',
    'settings.accounts.notConnected': 'No conectado',
    
    // Settings - Preferences
    'settings.preferences.title': 'Preferencias',
    'settings.preferences.language': 'Idioma',
    'settings.preferences.languageDesc': 'Elige tu idioma preferido para la interfaz',
    'settings.preferences.theme': 'Tema',
    'settings.preferences.themeLight': 'Claro',
    'settings.preferences.themeDark': 'Oscuro',
    'settings.preferences.themeSystem': 'Sistema',
    'settings.preferences.devMode': 'Modo de Desarrollador',
    'settings.preferences.devModeDesc': 'Mostrar claves de traducción como tooltips para depuración',
    
    // Settings - Notifications
    'settings.notifications.title': 'Preferencias de Notificación',
    'settings.notifications.email': 'Notificaciones por Correo',
    'settings.notifications.emailDesc': 'Recibe correos sobre tu actividad y actualizaciones',
    'settings.notifications.push': 'Notificaciones Push',
    'settings.notifications.pushDesc': 'Recibe notificaciones push en tu navegador',
    'settings.notifications.courseUpdates': 'Actualizaciones de Cursos',
    'settings.notifications.courseUpdatesDesc': 'Notificaciones sobre nuevas lecciones y cursos',
    'settings.notifications.achievements': 'Logros',
    'settings.notifications.achievementsDesc': 'Recibe notificaciones al desbloquear logros',
    
    // Settings - Privacy
    'settings.privacy.title': 'Configuración de Privacidad',
    'settings.privacy.publicProfile': 'Perfil Público',
    'settings.privacy.publicProfileDesc': 'Haz que tu perfil sea visible para otros usuarios',
    'settings.privacy.leaderboard': 'Mostrar en Clasificación',
    'settings.privacy.leaderboardDesc': 'Muestra tus estadísticas en la clasificación global',
    'settings.privacy.activity': 'Estado de Actividad',
    'settings.privacy.activityDesc': 'Muestra cuando estás aprendiendo activamente',
    'settings.privacy.dataManagement': 'Gestión de Datos',
    'settings.privacy.downloadData': 'Descargar Mis Datos',
    'settings.privacy.downloadDataDesc': 'Exporta todos tus datos de aprendizaje y progreso',
    'settings.privacy.deleteAccount': 'Eliminar Cuenta',
    'settings.privacy.deleteAccountDesc': 'Elimina permanentemente tu cuenta y todos los datos',
    
    // Wallet
    'wallet.connect': 'Conectar Billetera',
    'wallet.disconnect': 'Desconectar',
    'wallet.connected': 'Conectado',
    'wallet.balance': 'Saldo',
  },
};

export const languageInfo: Record<Language, { name: string; flag: string; nativeName: string }> = {
  'en': { name: 'English', flag: '🇺🇸', nativeName: 'English' },
  'pt-BR': { name: 'Portuguese (Brazil)', flag: '🇧🇷', nativeName: 'Português' },
  'es': { name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
};