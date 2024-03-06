import { BadgeRole } from "@/types/badge-role";

export default {
    'hello': 'Hello',
    'welcome': 'Welcome',
    'back': 'Back',
    'and': 'and',
    submit: 'Submit',
    success: 'Success!',
    updatedAt: 'Last updated on {updatedAt}',
    help: 'Help',
    homepage: {
        headingDescription: 'Read the latest {postsNumber} posts:',
        readMore: 'Read more',
    },
    read: 'Read',
    blog: {
        headingDescription: 'Read all posts ever published',
    },
    post: {
        headingDescription: 'Written by:',
    },
    notFound: {
        title: 'Uh oh! Not Found',
        description: 'This resource could not be found. Please try again.',
        action: 'Go home',
    },
    errors: {
        warning: 'Warning!',
        general: 'Uh oh! Something went wrong.',
        unauthorized: 'You\'re not authorized to perform this action',
        unauthenticated: 'You\'re not authenticated, login then try again!',
    },
    author: {
        heading: '{name}\'s posts',
        headingDescription: 'Joined at {date}',
    },
    login: {
        welcomeBack: 'Welcome back',
        emailLabel: 'Enter your email to sign in to your account',
        signUp: 'Don&apos;t have an account? Sign Up',
    },
    register: {
        createAccount: 'Create an account',
        privacyAgree: 'By clicking continue, you agree to our',
        termsOfService: 'Terms of Service',
        privacyPolicy: 'Privacy Policy',
        enterEmail: 'Enter your email below to create your account',
    },
    dashboard: {
        homeGreetings: 'Welcome, {name}',
        createNew: 'Create new',
        changeUser: 'or change user',
        settings: 'settings',
        sidebar: {
            overview: 'Overview',
            posts: 'Posts',
            users: 'Users',
        },
    },
    settings: {
        heading: 'Settings',
        headingDescription: 'Manage account and website settings.',
        userUpdate: {
            heading: 'User Info',
            headingDescription: 'Edit your info',
        },
    },
    comments: {
        heading: 'Comments',
        insert: {
            label: 'Your message',
            placeholder: 'Type your message here.',
            success: 'Successfully posted comment',
        },
        delete: {
            notFound: 'Comment not found',
            otherUserComment: 'Can\'t delete other user\'s comment',
            success: 'Comment successfully deleted',
        },
    },
    pageSwitcher: {
        title: 'Go to Page',
        description: 'Choose a page number to navigate to.',
        label: 'Number',
    },
    accounts: {
        heading: 'Linked accounts',
        headingDescription: 'Link/Unlink accounts',
        delete: {
            notFound: 'Account not found',
            success: 'Account successfully unlinked',
        },
    },
    userMenu: {
        install: 'Install',
        dashboard: 'Dashboard',
        notifications: 'Enable Notifications',
        settings: 'Settings',
        signOut: 'Sign out',
        users: 'Users',
    },
    roles: {
        ADMIN: 'Admin',
        EDITOR: 'Editor',
        USER: 'User',
        AUTHOR: 'Author',
    } as Record<BadgeRole, string>,
    posts: {
        heading: 'Posts',
        headingDescription: 'Create and manage posts.',
    },
    users: {
        heading: 'Users',
        headingDescription: 'Create and manage users.',
    },
    likes: {
        like: 'Like',
        liked: 'Liked',
        unliked: 'Unliked',
        success: 'Successfully {liked} post',
    },
} as const