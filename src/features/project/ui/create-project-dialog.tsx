import { useState, type ReactNode } from 'react'
import { CirclePlusIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { ProjectForm } from './project-form'

type Props = {
  trigger?: ReactNode
  onSuccess?: () => void
}

/**
 * Dialog for creating a new project
 * Can be used with custom trigger or default sidebar button
 */
export const CreateProjectDialog = ({ trigger, onSuccess }: Props) => {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
    onSuccess?.()
  }

  const defaultTrigger = (
    <Button variant='default' size='icon' type='button'>
      <CirclePlusIcon className='size-5' />
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? defaultTrigger}</DialogTrigger>
      <DialogContent aria-describedby={undefined} className='gap-6'>
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
        </DialogHeader>

        <ProjectForm mode='create' onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
