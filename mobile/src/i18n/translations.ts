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

    // Forgot Password
    forgotPasswordTitle: string;
    forgotPasswordSubtitle: string;
    emailOrPhonePlaceholder: string;
    sendVerificationCode: string;
    sending: string;
    backToLogin: string;
    otpSentTitle: string;
    otpSentMessage: string;
    enterEmailOrPhoneError: string;
    ok: string;

    // Send Money
    sendMoneyTitle: string;
    sendToCountryLabel: string;
    recipient: string;
    recipientPlaceholder: string;
    amount: string;
    noteOptional: string;
    notePlaceholder: string;
    confirmTransaction: string;
    sendConfirmMessage: string;
    cancel: string;
    confirm: string;
    moneySentSuccess: string;
    enterRecipientAndAmount: string;

    // Reset Password
    resetPasswordTitle: string;
    resetPasswordSubtitle: string;
    newPasswordPlaceholder: string;
    confirmNewPasswordPlaceholder: string;
    resetPassword: string;
    resetting: string;
    passwordResetSuccess: string;
    fillAllFields: string;
    passwordsDoNotMatch: string;
    passwordTooShort: string;

    // History Screen
    transactionHistory: string;
    transfer: string;
    received: string;
    billPayment: string;
    today: string;
    yesterday: string;

    // Transaction Details
    transactionDetails: string;
    shareReceipt: string;
    totalAmount: string;
    successful: string;
    transactionId: string;
    status: string;
    dateTime: string;
    transactionType: string;
    senderRecipient: string;
    paymentMethod: string;
    transactionFee: string;

    // Airtime
    buyAirtime: string;
    selectNetwork: string;
    phoneNumber: string;
    enterPhoneNumber: string;
    forSelf: string;
    forOthers: string;
    airtimeSuccess: string;
    airtimeError: string;

    // Savings
    mySavings: string;
    totalBalance: string;
    savingsGoals: string;
    addGoal: string;
    goalName: string;
    targetAmount: string;
    savedAmount: string;
    createGoal: string;
    goalCreated: string;
    enterGoalDetails: string;
    highYieldSavings: string;
    highYieldDesc: string;
    officialReceipt: string;
    contactSupport: string;

    // Common UI
    back: string;
    close: string;
    save: string;
    edit: string;
    delete: string;
    done: string;

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

    // Notification Settings
    notificationSettings: string;
    transactional: string;
    paymentReceived: string;
    paymentReceivedDesc: string;
    paymentSent: string;
    paymentSentDesc: string;
    marketing: string;
    promotions: string;
    promotionsDesc: string;
    newFeaturesNotif: string;
    newFeaturesNotifDesc: string;
    security: string;
    securityAlerts: string;
    securityAlertsDesc: string;

    // Security & Privacy Screen
    authentication: string;
    biometricLoginTitle: string;
    biometricLoginDesc: string;
    twoFactorAuth: string;
    twoFactorAuthDesc: string;
    transactionSecurity: string;
    transactionPin: string;
    secureYourTransactions: string;
    enterNewPin: string;
    change: string;
    enterNewPinPlaceholder: string;
    pinUpdatedSuccess: string;
    pinMustBe4Digits: string;
    privacy: string;
    privacyPolicy: string;
    termsOfService: string;
    deleteAccount: string;
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

        // Forgot Password
        forgotPasswordTitle: 'Forgot Password?',
        forgotPasswordSubtitle: "Enter your email or phone number and we'll send you a code to reset your password",
        emailOrPhonePlaceholder: 'Email or Phone Number',
        sendVerificationCode: 'Send Verification Code',
        sending: 'Sending...',
        backToLogin: 'Back to Login',
        otpSentTitle: 'OTP Sent',
        otpSentMessage: 'A verification code has been sent to your email/phone.',
        enterEmailOrPhoneError: 'Please enter your email or phone number',
        ok: 'OK',

        // Send Money
        sendMoneyTitle: 'Send Money',
        sendToCountryLabel: 'Send to Country',
        recipient: 'Recipient',
        recipientPlaceholder: 'Phone number or Name',
        amount: 'Amount',
        noteOptional: 'Note (Optional)',
        notePlaceholder: 'What is this for?',
        confirmTransaction: 'Confirm Transaction',
        sendConfirmMessage: 'Send {amount} {currency} to {recipient} in {country}?',
        cancel: 'Cancel',
        confirm: 'Confirm',
        moneySentSuccess: 'Money sent successfully!',
        enterRecipientAndAmount: 'Please enter recipient and amount',

        // Reset Password
        resetPasswordTitle: 'Reset Password',
        resetPasswordSubtitle: 'Create a new password for your account',
        newPasswordPlaceholder: 'New Password',
        confirmNewPasswordPlaceholder: 'Confirm New Password',
        resetPassword: 'Reset Password',
        resetting: 'Resetting...',
        passwordResetSuccess: 'Your password has been reset successfully.',
        fillAllFields: 'Please fill in all fields',
        passwordsDoNotMatch: 'Passwords do not match',
        passwordTooShort: 'Password must be at least 6 characters long',

        // History Screen
        transactionHistory: 'Transaction History',
        transfer: 'Transfer',
        received: 'Received',
        billPayment: 'Bill Payment',
        today: 'Today',
        yesterday: 'Yesterday',

        // Transaction Details
        transactionDetails: 'Transaction Details',
        shareReceipt: 'Share Receipt',
        totalAmount: 'Total Amount',
        successful: 'SUCCESSFUL',
        transactionId: 'Transaction ID',
        status: 'Status',
        dateTime: 'Date & Time',
        transactionType: 'Transaction Type',
        senderRecipient: 'Sender/Recipient',
        paymentMethod: 'Payment Method',
        transactionFee: 'Transaction Fee',

        // Airtime
        buyAirtime: 'Buy Airtime',
        selectNetwork: 'Select Network',
        phoneNumber: 'Phone Number',
        enterPhoneNumber: 'Enter phone number',
        forSelf: 'For Self',
        forOthers: 'For Others',
        airtimeSuccess: 'Airtime purchased successfully!',
        airtimeError: 'Failed to purchase airtime',

        // Savings
        mySavings: 'My Savings',
        totalBalance: 'Total Balance',
        savingsGoals: 'Savings Goals',
        addGoal: 'Add Goal',
        goalName: 'Goal Name',
        targetAmount: 'Target Amount',
        savedAmount: 'Saved Amount',
        createGoal: 'Create Goal',
        goalCreated: 'Savings goal created successfully!',
        enterGoalDetails: 'Enter goal details',
        highYieldSavings: 'High Yield Savings',
        highYieldDesc: 'Earn up to 12% p.a. on your savings with OpayCam Plus.',
        officialReceipt: 'Official Transaction Receipt',
        contactSupport: 'For support, contact us at support@opaycam.com',

        // Common UI
        back: 'Back',
        close: 'Close',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        done: 'Done',

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

        // Notification Settings
        notificationSettings: 'Notification Settings',
        transactional: 'Transactional',
        paymentReceived: 'Payment Received',
        paymentReceivedDesc: 'Get notified when you receive money',
        paymentSent: 'Payment Sent',
        paymentSentDesc: 'Confirmation when money is sent',
        marketing: 'Marketing',
        promotions: 'Promotions',
        promotionsDesc: 'Special offers and deals',
        newFeaturesNotif: 'New Features',
        newFeaturesNotifDesc: 'Updates about new features',
        security: 'Security',
        securityAlerts: 'Security Alerts',
        securityAlertsDesc: 'Important security notifications',

        // Security & Privacy Screen
        authentication: 'Authentication',
        biometricLoginTitle: 'Biometric Login',
        biometricLoginDesc: 'Use fingerprint or face ID to login',
        twoFactorAuth: 'Two-Factor Authentication',
        twoFactorAuthDesc: 'Add an extra layer of security',
        transactionSecurity: 'Transaction Security',
        transactionPin: 'Transaction PIN',
        secureYourTransactions: 'Secure your transactions',
        enterNewPin: 'Enter new 4-digit PIN',
        change: 'Change',
        enterNewPinPlaceholder: 'Enter new PIN',
        pinUpdatedSuccess: 'Transaction PIN updated successfully',
        pinMustBe4Digits: 'PIN must be 4 digits',
        privacy: 'Privacy',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        deleteAccount: 'Delete Account',
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

        // Forgot Password
        forgotPasswordTitle: 'Mot de passe oublié ?',
        forgotPasswordSubtitle: 'Entrez votre email ou numéro de téléphone pour recevoir un code de réinitialisation',
        emailOrPhonePlaceholder: 'Email ou Numéro de téléphone',
        sendVerificationCode: 'Envoyer le code',
        sending: 'Envoi...',
        backToLogin: 'Retour à la connexion',
        otpSentTitle: 'Code envoyé',
        otpSentMessage: 'Un code de vérification a été envoyé à votre email/téléphone.',
        enterEmailOrPhoneError: 'Veuillez entrer votre email ou numéro de téléphone',
        ok: 'OK',

        // Send Money
        sendMoneyTitle: 'Envoyer de l\'argent',
        sendToCountryLabel: 'Envoyer vers',
        recipient: 'Destinataire',
        recipientPlaceholder: 'Numéro ou Nom',
        amount: 'Montant',
        noteOptional: 'Note (Optionnel)',
        notePlaceholder: 'Pour quoi faire ?',
        confirmTransaction: 'Confirmer la transaction',
        sendConfirmMessage: 'Envoyer {amount} {currency} à {recipient} au {country} ?',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        moneySentSuccess: 'Argent envoyé avec succès !',
        enterRecipientAndAmount: 'Veuillez entrer le destinataire et le montant',

        // Reset Password
        resetPasswordTitle: 'Réinitialiser le mot de passe',
        resetPasswordSubtitle: 'Créez un nouveau mot de passe pour votre compte',
        newPasswordPlaceholder: 'Nouveau mot de passe',
        confirmNewPasswordPlaceholder: 'Confirmer le nouveau mot de passe',
        resetPassword: 'Réinitialiser',
        resetting: 'Réinitialisation...',
        passwordResetSuccess: 'Votre mot de passe a été réinitialisé avec succès.',
        fillAllFields: 'Veuillez remplir tous les champs',
        passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
        passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',

        // History Screen
        transactionHistory: 'Historique des transactions',
        transfer: 'Transfert',
        received: 'Reçu',
        billPayment: 'Paiement de facture',
        today: 'Aujourd\'hui',
        yesterday: 'Hier',

        // Transaction Details
        transactionDetails: 'Détails de la transaction',
        shareReceipt: 'Partager le reçu',
        totalAmount: 'Montant total',
        successful: 'RÉUSSI',
        save: 'Enregistrer',
        edit: 'Modifier',
        delete: 'Supprimer',
        done: 'Terminé',

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

        // Notification Settings
        notificationSettings: 'Paramètres de notification',
        transactional: 'Transactionnel',
        paymentReceived: 'Paiement reçu',
        paymentReceivedDesc: 'Être notifié lors de la réception d\'argent',
        paymentSent: 'Paiement envoyé',
        paymentSentDesc: 'Confirmation lors de l\'envoi d\'argent',
        marketing: 'Marketing',
        promotions: 'Promotions',
        promotionsDesc: 'Offres spéciales et réductions',
        newFeaturesNotif: 'Nouvelles fonctionnalités',
        newFeaturesNotifDesc: 'Mises à jour sur les nouvelles fonctionnalités',
        security: 'Sécurité',
        securityAlerts: 'Alertes de sécurité',
        securityAlertsDesc: 'Notifications de sécurité importantes',

        // Security & Privacy Screen
        authentication: 'Authentification',
        biometricLoginTitle: 'Connexion biométrique',
        biometricLoginDesc: 'Utilisez l\'empreinte digitale ou Face ID',
        twoFactorAuth: 'Authentification à deux facteurs',
        twoFactorAuthDesc: 'Ajoutez une couche de sécurité supplémentaire',
        transactionSecurity: 'Sécurité des transactions',
        transactionPin: 'Code PIN de transaction',
        secureYourTransactions: 'Sécurisez vos transactions',
        enterNewPin: 'Entrez un nouveau code PIN à 4 chiffres',
        change: 'Modifier',
        enterNewPinPlaceholder: 'Entrez le nouveau PIN',
        pinUpdatedSuccess: 'Code PIN de transaction mis à jour avec succès',
        pinMustBe4Digits: 'Le code PIN doit contenir 4 chiffres',
        privacy: 'Confidentialité',
        privacyPolicy: 'Politique de confidentialité',
        termsOfService: 'Conditions d\'utilisation',
        deleteAccount: 'Supprimer le compte',
    }
};
