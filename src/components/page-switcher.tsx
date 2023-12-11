import { FC } from 'react';
import { Button, buttonVariants } from './ui/button';
import { Icon } from './icons';

interface PageSwitcherProps {
  pageIndex: number;
  pageCount: number;
  onPageChange: (increment: number) => void;
}

export const PageSwitcher: FC<PageSwitcherProps> = ({ pageIndex, pageCount, onPageChange }) => (
  <center className='content-center justify-items-center grid grid-cols-3 py-6'>
    <Button onClick={() => onPageChange(-1)} disabled={pageIndex === 0}>
      <Icon icon='chevronLeft'/>
    </Button>
    <p className={buttonVariants({ variant: 'outline' })}>
      {pageIndex + 1} of {pageCount}
    </p>
    <Button onClick={() => onPageChange(1)} disabled={pageIndex >= pageCount - 1}>
      <Icon icon='chevronRight'/>
    </Button>
  </center>
);