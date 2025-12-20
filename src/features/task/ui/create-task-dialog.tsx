import { useMemo, useState } from 'react'
import { CirclePlusIcon } from 'lucide-react'
import { type Category } from '@/entities/category'
import { type Project } from '@/entities/project'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { formModes } from '@/shared/constants'
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
    /** Project object */
    project?: Pick<Project, 'id' | 'name' | 'slug'>
    /** Category object */
    category?: Pick<Category, 'id' | 'name' | 'slug'>
  }
}

export const CreateTaskDialog = ({
  buttonText = 'Create',
  buttonVariant = 'default',
  defaultValues,
}: Props) => {
  const [open, setOpen] = useState(false)

  // Prepare form default values
  const formDefaultValues = useMemo(() => {
    return {
      project: defaultValues?.project
        ? {
            id: defaultValues.project.id,
            name: defaultValues.project.name,
            slug: defaultValues.project.slug,
          }
        : null,
      category: defaultValues?.category
        ? {
            id: defaultValues.category.id,
            name: defaultValues.category.name,
            slug: defaultValues.category.slug,
          }
        : null,
    }
  }, [defaultValues])

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
          mode={formModes.create}
          onSuccess={handleSuccess}
          defaultValues={formDefaultValues}
        />
      </DialogContent>
    </Dialog>
  )
}
