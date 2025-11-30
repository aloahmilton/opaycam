export type Language = 'EN' | 'FR';

export type TranslationKeys = {
    // Auth
    welcomeBack: string;
    createAccount: string;
    login: string;
    signUp: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    fullNamePlaceholder: string;
    forgotPassword: string;
    biometricLogin: string;
    noAccount: string;
    hasAccount: string;
    orContinueWith: string;
    backToLogin: string;

    // Home
    hello: string;
    accountBalance: string;
    sendMoney: string;
    receive: string;
    payBills: string;
    airtime: string;
    savings: string;
    newFeatures: string;
    bankTransfer: string;
    more: string;
    recentTransactions: string;
    seeAll: string;
    sendToCountry: string;
    fastSecure: string;

    // Common
    success: string;
    error: string;
    loading: string;
    selectLanguage: string;

    // Common UI
    back: string;
    close: string;
    save: string;
    edit: string;
    delete: string;
    done: string;
    cancel: string;
    confirm: string;
    ok: string;

    // Profile Screen
    verifiedUser: string;
    account: string;
    personalInformation: string;
    paymentMethods: string;
    securityPrivacy: string;
    settings: string;
    notifications: string;
    language: string;
    darkMode: string;
    logOut: string;
    version: string;
};

export const translations: Record<Language, TranslationKeys> = {
    EN: {
        // Auth
        welcomeBack: 'Welcome Back!',
        createAccount: 'Create Account',
        login: 'Login',
        signUp: 'Sign Up',
        emailPlaceholder: 'Email',
        phonePlaceholder: 'Phone Number',
        passwordPlaceholder: 'Password',
        confirmPasswordPlaceholder: 'Confirm Password',
        fullNamePlaceholder: 'Full Name',
        forgotPassword: 'Forgot Password?',
        biometricLogin: 'Login with Fingerprint',
        noAccount: "Don't have an account? ",
        hasAccount: 'Already have an account? ',
        orContinueWith: 'Or continue with',
        backToLogin: 'Back to Login',

        // Home
        hello: 'Hello',
        accountBalance: 'Account Balance',
        sendMoney: 'Send Money',
        receive: 'Receive',
        payBills: 'Pay Bills',
        airtime: 'Airtime',
        savings: 'Savings',
        newFeatures: 'New Features',
        bankTransfer: 'Bank Transfer',
        more: 'More',
        recentTransactions: 'Recent Transactions',
        seeAll: 'See All',
        sendToCountry: 'Send to Another Country',
        fastSecure: '6 countries • Fast & Secure',

        // Common
        success: 'Success',
        error: 'Error',
        loading: 'Loading...',
        selectLanguage: 'Select Language',

        // Common UI
        back: 'Back',
        close: 'Close',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        done: 'Done',
        cancel: 'Cancel',
        confirm: 'Confirm',
        ok: 'OK',

        // Profile Screen
        verifiedUser: 'Verified User',
        account: 'Account',
        personalInformation: 'Personal Information',
        paymentMethods: 'Payment Methods',
        securityPrivacy: 'Security & Privacy',
        settings: 'Settings',
        notifications: 'Notifications',
        language: 'Language',
        darkMode: 'Dark Mode',
        logOut: 'Log Out',
        version: 'Version',
    },
    FR: {
        // Auth
        welcomeBack: 'Bon retour !',
        createAccount: 'Créer un compte',
        login: 'Connexion',
        signUp: "S'inscrire",
        emailPlaceholder: 'Email',
        phonePlaceholder: 'Numéro de téléphone',
        passwordPlaceholder: 'Mot de passe',
        confirmPasswordPlaceholder: 'Confirmer le mot de passe',
        fullNamePlaceholder: 'Nom complet',
        forgotPassword: 'Mot de passe oublié ?',
        biometricLogin: 'Connexion par empreinte',
        noAccount: "Pas encore de compte ? ",
        hasAccount: 'Déjà un compte ? ',
        orContinueWith: 'Ou continuer avec',
        backToLogin: 'Retour à la connexion',

        // Home
        hello: 'Bonjour',
        accountBalance: 'Solde du compte',
        sendMoney: 'Envoyer',
        receive: 'Recevoir',
        payBills: 'Factures',
        airtime: 'Crédit',
        savings: 'Épargne',
        newFeatures: 'Nouveautés',
        bankTransfer: 'Virement',
        more: 'Plus',
        recentTransactions: 'Transactions récentes',
        seeAll: 'Voir tout',
        sendToCountry: 'Envoi international',
        fastSecure: '6 pays • Rapide & Sécurisé',

        // Common
        success: 'Succès',
        error: 'Erreur',
        loading: 'Chargement...',
        selectLanguage: 'Choisir la langue',

        // Common UI
        back: 'Retour',
        close: 'Fermer',
        save: 'Enregistrer',
        edit: 'Modifier',
        delete: 'Supprimer',
        done: 'Terminé',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        ok: 'OK',

        // Profile Screen
        verifiedUser: 'Utilisateur vérifié',
        account: 'Compte',
        personalInformation: 'Informations personnelles',
        paymentMethods: 'Modes de paiement',
        securityPrivacy: 'Sécurité et confidentialité',
        settings: 'Paramètres',
        notifications: 'Notifications',
        language: 'Langue',
        darkMode: 'Mode sombre',
        logOut: 'Déconnexion',
        version: 'Version',
    }
};
