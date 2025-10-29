import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, ChevronDownIcon, FolderIcon } from 'lucide-react'
import { SelectCategoryDialog } from '@/features/category'
import { SelectProjectDialog } from '@/features/project'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import { DialogClose, DialogFooter } from '@/shared/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Spinner } from '@/shared/components/ui/spinner'
import { Textarea } from '@/shared/components/ui/textarea'
import { taskStatuses, type FormMode } from '@/shared/constants'
import { useTaskForm } from '../model'

type Props = {
  mode?: FormMode
  taskId?: string
  onSuccess?: () => void
  defaultValues?: {
    project?: { id: string; name: string; slug: string } | null
    category?: { id: string; name: string; slug: string } | null
  }
}

export const TaskForm = ({
  mode = 'create',
  taskId,
  onSuccess,
  defaultValues,
}: Props) => {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)

  const { form, onSubmit, isLoading, buttonText } = useTaskForm({
    mode,
    taskId,
    onSuccess,
    defaultValues,
  })

  // Get selected project and category from form
  const selectedProject = form.watch('project')
  const selectedCategory = form.watch('category')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter task name' {...field} />
              </FormControl>
              <FormDescription>The name of the task.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder='Task description'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional description of the task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* STATUS */}
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(taskStatuses).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value.charAt(0).toUpperCase() +
                        value.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PROJECT */}
        <FormField
          control={form.control}
          name='project'
          render={() => (
            <FormItem>
              <div className='flex items-center gap-3'>
                <Button
                  variant='outline'
                  type='button'
                  className='flex w-36 flex-shrink-0 items-center justify-between rounded'
                  onClick={() => setIsProjectDialogOpen(true)}
                >
                  <FormLabel>Project</FormLabel>
                  <ChevronDownIcon className='size-4' />
                </Button>

                <FormControl>
                  <div className='bg-muted flex h-9 flex-1 items-center gap-2 rounded px-2'>
                    {selectedProject && (
                      <>
                        <FolderIcon className='mr-2 h-4 w-4 text-orange-500' />
                        <span className='truncate'>{selectedProject.name}</span>
                      </>
                    )}
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={() => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                  onClick={() => setIsCategoryDialogOpen(true)}
                >
                  {selectedCategory ? (
                    <>
                      <FolderIcon className='mr-2 h-4 w-4 text-blue-500' />
                      <span className='truncate'>{selectedCategory.name}</span>
                    </>
                  ) : (
                    'Select category'
                  )}
                </Button>
              </FormControl>
              <FormDescription>Optional category assignment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='dueDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className='w-full justify-start text-left font-normal'
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Optional due date for the task.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='note'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  rows={2}
                  placeholder='Additional notes'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional notes for the task.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' disabled={isLoading}>
            {isLoading && <Spinner />}
            {buttonText}
          </Button>
        </DialogFooter>
      </form>

      {/* Project Selection Dialog */}
      <SelectProjectDialog
        open={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
        onSelect={project => {
          form.setValue('project', project)
        }}
        selectedProjectId={selectedProject?.id ?? null}
      />

      {/* Category Selection Dialog */}
      <SelectCategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        onSelect={category => {
          form.setValue('category', category)
        }}
        selectedCategoryId={selectedCategory?.id ?? null}
      />
    </Form>
  )
}
