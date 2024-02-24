import { NavbarSection } from "@/types/nav"
import { Icon } from "@/components/icons"

interface MobileNavProps {
  sections: NavbarSection[];
  item: (props: any) => "" | JSX.Element;
}

export function NavSection({ sections, item }: MobileNavProps) {

  return (
    <>
      {sections.map((section, index) => {
        return (
          <nav key={index} className="hidden gap-6 md:flex">
            <div className="px-3 py-2 min-w-full">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {section.icon && <Icon icon={section.icon} />}
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((sectionItem) => {
                  return (
                    <div key={sectionItem.title} className="w-full">
                      {item({ item: sectionItem })}
                    </div>
                  )
                })}
              </div>
            </div>
          </nav>
        );
      })}
    </>
  )
}