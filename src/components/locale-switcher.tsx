'use client'

import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useChangeLocale, useCurrentLocale } from "@/lib/i18n/client";
import { emojis, locales } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";

interface LocaleSwitcherProps extends React.ComponentProps<typeof DropdownMenu> { }

export function LocaleSwitcher(props: LocaleSwitcherProps) {
    const changeLocale = useChangeLocale();
    const currentLocale = useCurrentLocale();
    const isMobile = useIsMobile();
    const path = usePathname();

    return (
        <DropdownMenu {...props}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0 w-full">
                    {emojis[currentLocale]}
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile || !path?.startsWith('/dashboard') ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
                {locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => changeLocale(locale)}
                        className={locale === currentLocale ? 'border-l border-l-primary font-bold' : ''}
                    >
                        {emojis[locale]}
                        <span className="ml-2">{locale.toUpperCase()}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
