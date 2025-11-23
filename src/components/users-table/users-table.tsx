"use client";

import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { DataTable } from "@/components/data-table/data-table";
import type { User } from "@/generated/prisma/client";
import { useDataTable } from "@/hooks/use-data-table";
import {
	deleteSelectedRowsAction,
	UserTableFloatingBarContent,
} from "./actions";
import {
	fetchUsersTableColumnDefs,
	filterableColumns,
	searchableColumns,
} from "./columns";

interface UserTableProps {
	userPromise: Promise<{
		data: User[];
		pageCount: number;
	}>;
}

export function UserTable({ userPromise }: UserTableProps) {
	// Learn more about React.use here: https://react.dev/reference/react/use
	const { data, pageCount } = React.use(userPromise);

	// Memoize the columns so they don't re-render on every render
	const columns = React.useMemo<ColumnDef<User, unknown>[]>(
		() => fetchUsersTableColumnDefs(),
		[],
	);

	const { dataTable } = useDataTable({
		data,
		columns,
		pageCount,
		searchableColumns,
		filterableColumns,
	});

	return (
		<DataTable
			dataTable={dataTable}
			columns={columns}
			searchableColumns={searchableColumns}
			filterableColumns={filterableColumns}
			floatingBarContent={UserTableFloatingBarContent(dataTable)}
			deleteRowsAction={(event) =>
				deleteSelectedRowsAction({
					table: dataTable,
					event,
				})
			}
		/>
	);
}
