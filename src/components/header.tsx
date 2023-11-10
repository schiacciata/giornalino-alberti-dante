interface HeaderProps {
    heading: string
    text?: string
    children?: React.ReactNode
  }
  
export function Header({
    heading,
    text,
    children,
  }: HeaderProps) {
    return (
      <div className="flex items-center justify-between px-2 py-4">
        <div className="grid gap-1">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">{heading}</h1>
          {text && <p className="max-w-[700px] text-lg text-muted-foreground italic">{text}</p>}
        </div>
        {children}
      </div>
    )
}