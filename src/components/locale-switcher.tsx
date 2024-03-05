'use client'

import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useChangeLocale, useCurrentLocale } from "@/lib/i18n/client";
import { emojis, locales } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
    const changeLocale = useChangeLocale();
    const currentLocale = useCurrentLocale();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                    {emojis[currentLocale]}
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
