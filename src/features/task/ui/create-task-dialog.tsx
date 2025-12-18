import { useMemo, useState } from 'react'
import { CirclePlusIcon } from 'lucide-react'
import { useFindCategoryById } from '@/features/category'
import { useFindProjectById } from '@/features/project'
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

  // Fetch project and category data when IDs are provided
  const { data: project } = useFindProjectById(defaultValues?.projectId ?? '')
  const { data: category } = useFindCategoryById(
    defaultValues?.categoryId ?? '',
  )

  // Convert IDs to objects expected by TaskForm
  const formDefaultValues = useMemo(() => {
    return {
      project: project
        ? { id: project.id, name: project.name, slug: project.slug }
        : null,
      category: category
        ? { id: category.id, name: category.name, slug: category.slug }
        : null,
    }
  }, [project, category])

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
          defaultValues={formDefaultValues}
        />
      </DialogContent>
    </Dialog>
  )
}
