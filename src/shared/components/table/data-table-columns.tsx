import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table'

/**
 * Utility function to create column definitions with consistent styling
 *
 * @param id - Column identifier
 * @param header - Header text or component
 * @param cell - Cell renderer function
 * @param options - Additional column options
 * @returns Column definition object
 */
export const createColumn = <TData, TValue>(
  id: string,
  header: string | ((props: HeaderContext<TData, TValue>) => React.ReactNode),
  cell: (props: CellContext<TData, TValue>) => React.ReactNode,
  options: Partial<ColumnDef<TData, TValue>> = {},
): ColumnDef<TData, TValue> => {
  return {
    id,
    accessorKey: id,
    header,
    cell,
    ...options,
  }
}

/**
 * Utility function to create sortable column
 *
 * @param id - Column identifier
 * @param header - Header text
 * @param cell - Cell renderer function
 * @param options - Additional column options
 * @returns Sortable column definition
 */
export const createSortableColumn = <TData, TValue>(
  id: string,
  header: string,
  cell: (props: CellContext<TData, TValue>) => React.ReactNode,
  options: Partial<ColumnDef<TData, TValue>> = {},
): ColumnDef<TData, TValue> => {
  return createColumn(id, header, cell, {
    enableSorting: true,
    ...options,
  })
}

/**
 * Utility function to create filterable column
 *
 * @param id - Column identifier
 * @param header - Header text
 * @param cell - Cell renderer function
 * @param options - Additional column options
 * @returns Filterable column definition
 */
export const createFilterableColumn = <TData, TValue>(
  id: string,
  header: string,
  cell: (props: CellContext<TData, TValue>) => React.ReactNode,
  options: Partial<ColumnDef<TData, TValue>> = {},
): ColumnDef<TData, TValue> => {
  return createColumn(id, header, cell, {
    enableColumnFilter: true,
    ...options,
  })
}
