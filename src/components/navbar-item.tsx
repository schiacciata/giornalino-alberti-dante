import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Icon } from "./icons";

type NavbarItemProps = {
    item: NavItem;
}

export function NavbarItem({ item }: NavbarItemProps) {
    const segment = useSelectedLayoutSegment()

    return (
        <Link
            href={item.disabled ? "#" : item.href}
            target={item._blank ? '_blank': '_self'}
            className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                ? "text-foreground"
                : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
            )}
            >
            {item.icon && (<Icon icon={item.icon}/>)}
            {item.title}
        </Link>
    )
}