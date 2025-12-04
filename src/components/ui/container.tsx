import type { RootLayoutProps } from "@/types/layout";

const Container = ({ children }: RootLayoutProps) => {
	return (
		<div className="container mx-auto px-4 flex-1 space-y-6">{children}</div>
	);
};

export default Container;
