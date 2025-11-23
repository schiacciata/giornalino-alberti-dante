import { notFound, redirect } from "next/navigation";
import { Link } from "next-view-transitions";
import { ReactElement } from "react";
import { Shell } from "@/components/dashboard/shell";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { Header } from "@/components/header";
import { Icon } from "@/components/icons";
import { PageCreateButton } from "@/components/page/page-create-button";
import { PageTable } from "@/components/pages-table/pages-table";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AdminEditForm from "@/components/user/admin-edit-form";
import { authPages } from "@/lib/auth/config";
import { isAdmin } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { getCurrentLocale, getI18n } from "@/lib/i18n/server";
import { getPages } from "@/lib/queries/page";
import { cn, formatDate } from "@/lib/utils";
import type { SearchParams } from "@/types";

export const metadata = {
	title: "Pages",
};

type UsersPageProps = {
	params: Promise<{
		userId: string;
	}>;
	searchParams: SearchParams;
};

export default async function UsersPage(props: UsersPageProps) {
	const params = await props.params;
	const currentUser = await getCurrentUser();
	const locale = await getCurrentLocale();
	const t = await getI18n();

	if (!currentUser || !isAdmin(currentUser)) {
		redirect(authPages.signIn);
	}

	const user = await db.user.findFirst({
		where: {
			id: params.userId,
		},
	});
	if (!user) return notFound();

	const isEditingAdmin = isAdmin(user);

	return (
		<div className="grid gap-4 justify-center items-center">
			<Header
				heading={`Editing ${user.name}`}
				text={`${user.email} - ${t("updatedAt", {
					updatedAt: user.updatedAt.toLocaleString(locale),
				})}`}
			/>
			<Card className="w-full">
				<CardContent>
					<AdminEditForm
						user={{
							id: user.id,
							email: user.email,
							name: user.name,
							image: user.image,
							isTwoFactorEnabled: user.isTwoFactorEnabled,
							role: user.role,
						}}
						disabled={isEditingAdmin}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
