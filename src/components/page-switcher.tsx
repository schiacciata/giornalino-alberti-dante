import { FC, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icon } from './icons';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface PageSwitcherProps {
  pageIndex: number;
  pageCount: number;
  onPageChange: (increment: number) => void;
}

export const PageSwitcher: FC<PageSwitcherProps> = ({ pageIndex, pageCount, onPageChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(pageIndex + 1);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handlePageChange = () => {
    if (selectedPage > 0 && selectedPage <= pageCount) {
      onPageChange(selectedPage - 1);
      closeDialog();
    }
  };

  return (
    <>
      <center className='content-center justify-items-center grid grid-cols-3 py-6'>
        <Button onClick={() => onPageChange(-1)} disabled={pageIndex === 0}>
          <Icon icon='chevronLeft' className='mr-0'/>
        </Button>
        <p className={buttonVariants({ variant: 'outline' })} onClick={openDialog} style={{ cursor: 'pointer' }}>
          {pageIndex + 1} of {pageCount}
        </p>
        <Button onClick={() => onPageChange(1)} disabled={pageIndex >= pageCount - 1}>
          <Icon icon='chevronRight' className='mr-0'/>
        </Button>
      </center>

      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogTrigger>
          <span style={{ display: 'none' }}>Open</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Go to Page</DialogTitle>
            <DialogDescription>
              Choose a page number to navigate to.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 py-4">
            <Label htmlFor="number" className="text-right">
                Numero
            </Label>
            <Input
                id="number"
                name="number"
                required
                placeholder="123"
                type="number"
                className="col-span-3"value={selectedPage}
                onChange={(e) => setSelectedPage(Number(e.target.value))}
                min={1}
                max={pageCount}
            />
            <DialogFooter>
              <Button onClick={handlePageChange}>Go</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
