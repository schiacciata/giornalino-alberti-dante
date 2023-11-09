import { RootLayoutProps } from '@/types/layout';
import React from 'react';

const Header = ({ children }: RootLayoutProps) => {
  return (
    <header className="text-secondary-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{children}</header>
  );
};

export default Header;
