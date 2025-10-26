import { useState } from 'react'
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

export const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuSubButton>
          <CirclePlusIcon />
          <span>Add Category</span>
        </SidebarMenuSubButton>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className='gap-6'>
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
        </DialogHeader>

        <CategoryForm mode='create' onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
