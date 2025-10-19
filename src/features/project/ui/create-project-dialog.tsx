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
import { ProjectForm } from './project-form'

export const CreateProjectDialog = () => {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuSubButton>
          <CirclePlusIcon />
          <span>Add Project</span>
        </SidebarMenuSubButton>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className='gap-6'>
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
        </DialogHeader>

        <ProjectForm mode='create' onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
