import { cn } from "@/lib/utils";
import {
    Loader,
    X,
    Sun,
    Laptop,
    Moon,
    RefreshCcw,
    AlertTriangle,
    Heart,
    LogIn,
    BookCopy,
    User,
    Home,
    SpellCheck2,
    Book,
    ShoppingCart,
    ChevronLeft,
    LayoutDashboard,
    Shield,
    CalendarDays,
    Wrench,
    Megaphone,
    Download,
    BookOpen,
    Pin,
    Folder,
    CalendarX,
    AlertCircle,
    LucideProps,
    ArrowRight,
    CreditCard,
    FileText,
    HelpCircle,
    MoreVertical,
    Pizza,
    Plus,
    Settings,
    File,
    Trash,
    Image,
    ChevronRight,
    Globe,
    Music,
    PenBox,
    MessageCircle,
    Check,
    Eye,
    BellPlus,
    Lock,
    Unlink,
    Users,
    ShieldPlus,
    Clipboard,
    Share2,
} from "lucide-react"

export const Icons = {
    close: X,
    spinner: Loader,
    sun: Sun,
    moon: Moon,
    laptop: Laptop,
    reload: RefreshCcw,
    error: AlertTriangle,
    heart: Heart,
    login: LogIn,
    logo: BookCopy,
    user: User,
    home: Home,
    grade: SpellCheck2,
    book: Book,
    cart: ShoppingCart,
    back: ChevronLeft,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    dashboard: LayoutDashboard,
    calendar: CalendarDays,
    wrench: Wrench,
    notice: Megaphone,
    download: Download,
    read: BookOpen,
    pin: Pin,
    folder: Folder,
    absence: CalendarX,
    warning: AlertCircle,
    google: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-0.5 0 48 48"
            {...props}
            className={cn(props.className, 'fill-primary')}
        >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                    <g id="Google" transform="translate(401.000000, 860.000000)">
                        <path
                            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                            id="Fill-1" fill="#FBBC05"> </path>
                        <path
                            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                            id="Fill-2" fill="#EB4335"> </path>
                        <path
                            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                            id="Fill-3" fill="#34A853"> </path>
                        <path
                            d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                            id="Fill-4" fill="#4285F4"> </path>
                    </g>
                </g>
            </g>
        </svg>
    ),
    trash: Trash,
    post: FileText,
    page: File,
    media: Image,
    settings: Settings,
    billing: CreditCard,
    ellipsis: MoreVertical,
    add: Plus,
    arrowRight: ArrowRight,
    help: HelpCircle,
    pizza: Pizza,
    globe: Globe,
    spotify: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="spotify"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            version="1.1"
            preserveAspectRatio="xMidYMid"
            {...props}
            className={cn(props.className, 'fill-primary')}
        >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Color-" transform="translate(-200.000000, -460.000000)" fill="#00DA5A">
                    <path
                        d="M238.16,481.36 C230.48,476.8 217.64,476.32 210.32,478.6 C209.12,478.96 207.92,478.24 207.56,477.16 C207.2,475.96 207.92,474.76 209,474.4 C217.52,471.88 231.56,472.36 240.44,477.64 C241.52,478.24 241.88,479.68 241.28,480.76 C240.68,481.6 239.24,481.96 238.16,481.36 M237.92,488.08 C237.32,488.92 236.24,489.28 235.4,488.68 C228.92,484.72 219.08,483.52 211.52,485.92 C210.56,486.16 209.48,485.68 209.24,484.72 C209,483.76 209.48,482.68 210.44,482.44 C219.2,479.8 230,481.12 237.44,485.68 C238.16,486.04 238.52,487.24 237.92,488.08 M235.04,494.68 C234.56,495.4 233.72,495.64 233,495.16 C227.36,491.68 220.28,490.96 211.88,492.88 C211.04,493.12 210.32,492.52 210.08,491.8 C209.84,490.96 210.44,490.24 211.16,490 C220.28,487.96 228.2,488.8 234.44,492.64 C235.28,493 235.4,493.96 235.04,494.68 M224,460 C210.8,460 200,470.8 200,484 C200,497.2 210.8,508 224,508 C237.2,508 248,497.2 248,484 C248,470.8 237.32,460 224,460">
                    </path>
                </g>
            </g>
        </svg>
    ),
    edit: PenBox,
    message: MessageCircle,
    ADMIN: Shield,
    EDITOR: PenBox,
    USER: User,
    check: Check,
    cross: X,
    view: Eye,
    bell: BellPlus,
    github: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="github"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            {...props}
        >
            <path
                fill="currentColor"
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
            ></path>
        </svg>
    ),
    private: Lock,
    public: Globe,
    discord: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="discord"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -28.5 256 256"
            version="1.1"
            preserveAspectRatio="xMidYMid"
            {...props}
            className={cn(props.className, 'fill-primary')}
        >
            <path
                fill="#5865F2"
                fillRule="nonzero"
                d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z">
            </path>
        </svg>
    ),
    unlink: Unlink,
    users: Users,
    role: ShieldPlus,
    instagram: ({ ...props }: LucideProps) => (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="instagram"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            version="1.1"
            strokeWidth="0"
            strokeLinejoin="round"
            strokeLinecap="round"
            {...props}
            className={cn(props.className, 'fill-primary')}
        >
            <g>
                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"></rect>
                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect>
                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect>
                <path
                    d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                    fill="white"></path>
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                    fill="white"></path>
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
                    fill="white"></path>
                <defs>
                    <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
                        <stop stopColor="#B13589"></stop>
                        <stop offset="0.79309" stopColor="#C62F94"></stop>
                        <stop offset="1" stopColor="#8A3AC8"></stop>
                    </radialGradient>
                    <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                        <stop stopColor="#E0E8B7"></stop>
                        <stop offset="0.444662" stopColor="#FB8A2E"></stop>
                        <stop offset="0.71474" stopColor="#E2425C"></stop>
                        <stop offset="1" stopColor="#E2425C" stopOpacity="0"></stop>
                    </radialGradient>
                    <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
                        <stop offset="0.156701" stopColor="#406ADC"></stop>
                        <stop offset="0.467799" stopColor="#6A45BE"></stop>
                        <stop offset="1" stopColor="#6A45BE" stopOpacity="0"></stop>
                    </radialGradient>
                </defs>
            </g>
        </svg>
    ),
    copy: Clipboard,
    share: Share2,
}

export type TIcon = keyof typeof Icons;

type IconProps = LucideProps & {
    icon: TIcon;
};

export const Icon = ({ icon, className, ...props }: IconProps) => {
    const IconComponent = Icons[icon];
    if (!IconComponent) {
        return null;
    }

    return <IconComponent className={cn("mr-2 h-4 w-4", className)} {...props} />;
};