import { useState } from 'react'
import { CirclePlusIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { TaskForm } from './task-form'

type Props = {
  /** Trigger button text */
  buttonText?: string
  /** Trigger button variant */
  buttonVariant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive'
  /** Default values for the form */
  defaultValues?: {
    projectId?: string
    categoryId?: string
  }
}

export const CreateTaskDialog = ({
  buttonText = 'Create Task',
  buttonVariant = 'default',
  defaultValues,
}: Props) => {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <CirclePlusIcon className='mr-2 h-4 w-4' />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className='gap-6'>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <TaskForm
          mode='create'
          onSuccess={handleSuccess}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  )
}
