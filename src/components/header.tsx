'use client'

import * as React from 'react';

interface HeaderProps {
  heading: string | React.ReactNode;
  text?: string;
  children?: React.ReactNode;
}

export function Header({ heading, text, children }: HeaderProps) {
  React.useEffect(() => {
    if (!window) return;
    // Check if URL contains a hash (#) and scroll to the target element
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="flex items-center md:justify-between px-2 py-4">
      <div className="grid gap-3">
        <div className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {heading}
        </div>
        {text && <p className="max-w-[700px] text-lg text-muted-foreground italic">{text}</p>}
        <div className='md:hidden'>
          {children}
        </div>
      </div>
      <div className="space-x-2 hidden md:block">
        {children}
      </div>
    </div>
  );
}