import { useState, type ReactNode } from 'react'
import { CirclePlusIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { SidebarMenuSubButton } from '@/shared/components/ui/sidebar'
import { CategoryForm } from './category-form'

type Props = {
  trigger?: ReactNode
  onSuccess?: () => void
}

/**
 * Dialog for creating a new category
 * Can be used with custom trigger or default sidebar button
 */
export const CreateCategoryDialog = ({ trigger, onSuccess }: Props) => {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
    onSuccess?.()
  }

  const defaultTrigger = (
    <SidebarMenuSubButton>
      <CirclePlusIcon />
      <span>Add Category</span>
    </SidebarMenuSubButton>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? defaultTrigger}</DialogTrigger>
      <DialogContent aria-describedby={undefined} className='gap-6'>
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
        </DialogHeader>

        <CategoryForm mode='create' onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
