import { BadgeRole } from "@/types/badge-role";

export default {
    'hello': 'Ciao',
    'welcome': 'Benvenuto',
    'back': 'Indietro',
    'and': 'e',
    submit: 'Invia',
    success: 'Successo!',
    updatedAt: 'Ultimo aggiornamento il {updatedAt}',
    help: 'Aiuto',
    homepage: {
        headingDescription: 'Leggi gli ultimi {postsNumber} post:',
        readMore: 'Leggi di più',
    },
    read: 'Leggi',
    blog: {
        headingDescription: 'Leggi tutti i post pubblicati',
    },
    post: {
        headingDescription: 'Scritto da:',
    },
    notFound: {
        title: 'Uh oh! Non trovato',
        description: 'Questa risorsa non può essere trovata. Per favore, riprova.',
        action: 'Vai alla home',
    },
    errors: {
        warning: 'Attenzione!',
        general: 'Uh oh! Qualcosa è andato storto.',
        unauthorized: 'Non sei autorizzato a eseguire questa azione',
        unauthenticated: 'Non sei autenticato, effettua il login e riprova!',
    },
    author: {
        heading: 'Post di {name}',
        headingDescription: 'Iscritto il {date}',
    },
    login: {
        welcomeBack: 'Bentornato',
        emailLabel: 'Inserisci la tua email per accedere al tuo account',
        signUp: 'Non hai un account? Registrati',
    },
    register: {
        createAccount: 'Crea un account',
        privacyAgree: 'Facendo clic su Continua, accetti i nostri',
        termsOfService: 'Termini di Servizio',
        privacyPolicy: 'Informativa sulla Privacy',
        enterEmail: 'Inserisci la tua email qui sotto per creare il tuo account',
    },
    dashboard: {
        homeGreetings: 'Benvenuto, {name}',
        createNew: 'Crea nuovi',
        changeUser: 'o cambia',
        settings: 'Impostazioni',
        sidebar: {
            overview: 'Panoramica',
            posts: 'Articoli',
            users: 'Utenti',
        },
    },
    settings: {
        heading: 'Impostazioni',
        headingDescription: 'Gestisci le impostazioni dell\'account e del sito web.',
        userUpdate: {
            heading: 'Informazioni Utente',
            headingDescription: 'Modifica le tue informazioni',
        },
    },
    comments: {
        heading: 'Commenti',
        insert: {
            label: 'Il tuo commento',
            placeholder: 'Digita il tuo messaggio qui.',
            success: 'Commento inviato con successo',
        },
        delete: {
            notFound: 'Commento non trovato',
            otherUserComment: 'Impossibile eliminare il commento di un altro utente',
            success: 'Commento eliminato con successo',
        },
        share: 'Leggi il commento di {authorName} su {postName}',
    },
    pageSwitcher: {
        title: 'Vai alla pagina',
        description: 'Scegli un numero di pagina a cui navigare.',
        label: 'Numero',
    },
    accounts: {
        heading: 'Account collegati',
        headingDescription: 'Collega/Scollega account',
        delete: {
            notFound: 'Account non trovato',
            success: 'Account scollegato con successo',
        },
    },
    userMenu: {
        install: 'Installa app',
        dashboard: 'Dashboard',
        notifications: 'Abilita Notifiche',
        settings: 'Impostazioni',
        signOut: 'Log out',
        users: 'Utenti',
    },
    roles: {
        ADMIN: 'Amministratore',
        EDITOR: 'Editore',
        USER: 'Utente',
        AUTHOR: 'Autore',
    } as Record<BadgeRole, string>,
    posts: {
        heading: 'Articoli',
        headingDescription: 'Crea e gestisci articoli.',
        share: 'Leggi {postName}, scritto da {authorName}',
    },
    users: {
        heading: 'Utenti',
        headingDescription: 'Crea e gestisci articoli utenti',
    },
    likes: {
        like: 'Mi piace',
        liked: 'Mi piace',
        unliked: 'Non mi piace',
        successLiked: 'Post piaciuto',
        successUnliked: 'Rimosso mi piace con successo',
    },
} as const;
