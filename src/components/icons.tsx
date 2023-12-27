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
    admin: Shield,
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
            viewBox="0 0 488 512"
            {...props}
        >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
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
    spotify: Music,
    edit: PenBox,
    message: MessageCircle,
    editor: PenBox,
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

    return <IconComponent className={cn("mr-2 h-4 w-4", className)} {...props}/>;
};