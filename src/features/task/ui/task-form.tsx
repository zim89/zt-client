import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useFindCategoryNames } from '@/features/category'
import { useFindProjectNames } from '@/features/project'
import type { CategoryNameResponse } from '@/entities/category'
import type { ProjectNameResponse } from '@/entities/project'
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
    projectId?: string
    categoryId?: string
  }
}

export const TaskForm = ({
  mode = 'create',
  taskId,
  onSuccess,
  defaultValues,
}: Props) => {
  const { form, onSubmit, isLoading, buttonText } = useTaskForm({
    mode,
    taskId,
    onSuccess,
    defaultValues,
  })

  // Get projects and categories for select options
  const { data: projectsData } = useFindProjectNames()
  const { data: categoriesData } = useFindCategoryNames()

  const projects = projectsData ?? []
  const categories = categoriesData ?? []

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

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='projectId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select project' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='none'>No project</SelectItem>
                    {projects.map((project: ProjectNameResponse) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Optional project assignment.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='none'>No category</SelectItem>
                    {categories.map((category: CategoryNameResponse) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Optional category assignment.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
    </Form>
  )
}
