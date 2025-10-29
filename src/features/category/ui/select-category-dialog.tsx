'use client'

import { useState } from 'react'
import { FolderIcon, PlusIcon } from 'lucide-react'
import { useFindCategoryNames } from '@/features/category'
import type { CategoryNameResponse } from '@/entities/category'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Label } from '@/shared/components/ui/label'
import { Spinner } from '@/shared/components/ui/spinner'
import { CreateCategoryDialog } from './create-category-dialog'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (category: CategoryNameResponse | null) => void
  selectedCategoryId?: string | null
}

/**
 * Dialog for selecting a category from the list
 * Supports search and creating new categories
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * const [selectedCategory, setSelectedCategory] = useState<CategoryNameResponse | null>(null)
 *
 * <SelectCategoryDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onSelect={setSelectedCategory}
 *   selectedCategoryId={selectedCategory?.id ?? null}
 * />
 * ```
 */
export const SelectCategoryDialog = ({
  open,
  onOpenChange,
  onSelect,
  selectedCategoryId,
}: Props) => {
  const [tempSelectedId, setTempSelectedId] = useState<string | null>(
    selectedCategoryId ?? null,
  )

  // Fetch all categories
  const { data: categoriesData, isLoading } = useFindCategoryNames()

  const handleSelect = (categoryId: string) => {
    // Toggle selection - if already selected, deselect
    const newSelection = tempSelectedId === categoryId ? null : categoryId
    setTempSelectedId(newSelection)
  }

  const handleOK = () => {
    const selected =
      categoriesData?.find(
        (c: CategoryNameResponse) => c.id === tempSelectedId,
      ) ?? null
    onSelect(selected)
    onOpenChange(false)
  }

  const handleCancel = () => {
    // Reset to original selection
    setTempSelectedId(selectedCategoryId ?? null)
    onOpenChange(false)
  }

  const handleReset = () => {
    setTempSelectedId(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='gap-6' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Categories</DialogTitle>
        </DialogHeader>

        {/* Categories List */}
        <Command className='gap-3'>
          <div className='flex items-center gap-2'>
            <CommandInput
              placeholder='Find category...'
              wrapperClassName='flex-1 border rounded-md'
            />

            <CreateCategoryDialog
              trigger={
                <Button
                  variant='default'
                  type='button'
                  size='sm'
                  className='gap-2'
                >
                  <PlusIcon className='size-4' />
                  Add Category
                </Button>
              }
              onSuccess={() => {
                // todo: Refresh category list after creation
              }}
            />
          </div>

          <Label className='text-sm font-medium'>Select a category:</Label>

          <CommandList>
            {isLoading && (
              <div className='flex items-center justify-center py-8'>
                <Spinner />
              </div>
            )}

            {!isLoading && (!categoriesData || categoriesData.length === 0) && (
              <CommandEmpty>No categories found</CommandEmpty>
            )}

            {!isLoading && categoriesData && categoriesData.length > 0 && (
              <CommandGroup>
                {categoriesData.map((category: CategoryNameResponse) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => handleSelect(category.id)}
                    className='cursor-pointer'
                  >
                    <div className='flex w-full items-center gap-3'>
                      <Checkbox
                        checked={tempSelectedId === category.id}
                        onCheckedChange={() => handleSelect(category.id)}
                        className='size-4'
                      />
                      <FolderIcon className='size-5' />
                      <span className='flex-1'>{category.name}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>

        <DialogFooter className='sm:justify-between'>
          <Button variant='outline' onClick={handleReset}>
            Reset
          </Button>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleOK}>OK</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
