import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Skeleton } from "@/components/ui/skeleton"

const GridSkeleton = () => (
  <div className="flex flex-1 w-fit h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

export default function DashboardSettingsLoading() {
  const items = [
    {
      title: <Skeleton className="h-[30px] w-50"/>,
      description: <Skeleton className="h-[50px] w-96"/>,
      header: <GridSkeleton />,
      className: "md:col-span-2",
    },
    {
      title: <Skeleton className="h-[30px] w-50"/>,
      description: <Skeleton className="h-[50px] w-96"/>,
      header: <GridSkeleton />,
      className: "md:col-span-1",
    },
    {
      title: <Skeleton className="h-[30px] w-50"/>,
      description: <Skeleton className="h-[50px] w-96"/>,
      header: <GridSkeleton />,
      className: "md:col-span-1",
    },
    {
      title: <Skeleton className="h-[30px] w-50"/>,
      description: <Skeleton className="h-[50px] w-96"/>,
      header: <GridSkeleton />,
      className: "md:col-span-2",
    },
  ];

  return (
    <BentoGrid className="max-w-fit mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}
