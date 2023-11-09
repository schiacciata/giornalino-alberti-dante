import { RootLayoutProps } from '@/types/layout';
import React from 'react';

const CenteredContainer = ({ children }: RootLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default CenteredContainer;
