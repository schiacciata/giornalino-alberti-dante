'use client'

import { NavbarSection } from "@/types/nav"
import { Icon } from "@/components/icons"
import React from "react";
import Divider from "./ui/divider";

interface MobileNavProps {
  sections: NavbarSection[];
  item: (props: any) => "" | React.ReactElement;
}

export function NavSection({ sections, item: Item }: MobileNavProps) {
  return (
    <>
      {sections.map((section, index) => {
        return (
          <nav key={index} className="hidden gap-6 md:flex">
            <div className="px-3 py-2 min-w-full">
              {section.title && (<Divider>
                <div className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  {section.icon && <Icon icon={section.icon} />}
                  {section.title}
                </div>
              </Divider>)}
              <div className="space-y-1 w-full">
                {section.items.map((sectionItem, index) => {
                  return <Item item={sectionItem} key={index} />
                })}
              </div>
            </div>
          </nav>
        );
      })}
    </>
  )
}