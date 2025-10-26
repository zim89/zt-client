'use client'

import type { Table } from '@tanstack/react-table'
import { ChevronDownIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Input } from '@/shared/components/ui/input'

interface Props<TData> {
  table: Table<TData>
  searchKey?: string
  searchPlaceholder?: string
}

/**
 * Toolbar component for data tables with search and column visibility
 *
 * @param table - TanStack Table instance
 * @param searchKey - Key to search in the data
 * @param searchPlaceholder - Placeholder text for search input
 */
export const DataTableToolbar = <TData,>({
  table,
  searchKey,
  searchPlaceholder = 'Search...',
}: Props<TData>) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        {searchKey && (
          <div className='relative max-w-sm flex-1'>
            <SearchIcon className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
            <Input
              placeholder={searchPlaceholder}
              value={
                (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
              }
              onChange={event =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className='pl-8'
            />
          </div>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='ml-auto'>
            Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {table
            .getAllColumns()
            .filter(column => column.getCanHide())
            .map(column => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
