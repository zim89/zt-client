import { useState } from 'react'
import { format } from 'date-fns'
import {
  BriefcaseBusinessIcon,
  CalendarIcon,
  ChevronDownIcon,
  FolderIcon,
} from 'lucide-react'
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
} from '@/shared/components/ui/select'
import { Spinner } from '@/shared/components/ui/spinner'
import { Textarea } from '@/shared/components/ui/textarea'
import {
  formModes,
  taskStatusOptions,
  type FormMode,
  type TaskStatusOption,
} from '@/shared/constants'
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
  mode = formModes.create,
  taskId,
  onSuccess,
  defaultValues,
}: Props) => {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

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
        {/* NAME */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter task name ...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder='Enter task description ...'
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
          render={({ field }) => {
            const selectedStatus = field.value
            const selectedOption = selectedStatus
              ? taskStatusOptions[selectedStatus]
              : null

            return (
              <FormItem>
                <div className='flex items-center gap-3'>
                  <Select onValueChange={field.onChange} value={selectedStatus}>
                    <FormControl>
                      <SelectTrigger className='hover:bg-accent w-36 shrink-0 transition-colors duration-300'>
                        <FormLabel>Status</FormLabel>
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {(
                        Object.values(taskStatusOptions) as TaskStatusOption[]
                      ).map(option => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className='text-sm'
                        >
                          {(() => {
                            const Icon = option.icon
                            return <Icon className='size-4 shrink-0' />
                          })()}
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormControl>
                    <div className='bg-muted flex h-9 flex-1 items-center gap-2 rounded px-2 text-sm'>
                      {selectedOption && (
                        <>
                          {(() => {
                            const Icon = selectedOption.icon
                            return (
                              <Icon className='size-4 shrink-0 opacity-50' />
                            )
                          })()}
                          <span className='truncate'>
                            {selectedOption.label}
                          </span>
                        </>
                      )}
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )
          }}
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
                  className='flex w-36 shrink-0 items-center justify-between rounded'
                  onClick={() => setIsProjectDialogOpen(true)}
                >
                  <FormLabel>Project</FormLabel>
                  <ChevronDownIcon className='text-foreground/50! size-4' />
                </Button>

                <FormControl>
                  <div className='bg-muted flex h-9 flex-1 items-center gap-2 rounded px-2'>
                    {selectedProject && (
                      <>
                        <BriefcaseBusinessIcon className='size-4 shrink-0 opacity-50' />
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

        {/* CATEGORY */}
        <FormField
          control={form.control}
          name='category'
          render={() => (
            <FormItem>
              <div className='flex items-center gap-3'>
                <Button
                  variant='outline'
                  type='button'
                  className='flex w-36 shrink-0 items-center justify-between rounded'
                  onClick={() => setIsCategoryDialogOpen(true)}
                >
                  <FormLabel>Category</FormLabel>
                  <ChevronDownIcon className='text-foreground/50! size-4' />
                </Button>

                <FormControl>
                  <div className='bg-muted flex h-9 flex-1 items-center gap-2 rounded px-2'>
                    {selectedCategory && (
                      <>
                        <FolderIcon className='size-4 shrink-0 opacity-50' />
                        <span className='truncate'>
                          {selectedCategory.name}
                        </span>
                      </>
                    )}
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DUE DATE */}
        <FormField
          control={form.control}
          name='dueDate'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-3'>
                <Popover
                  open={isDatePickerOpen}
                  onOpenChange={setIsDatePickerOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      type='button'
                      className='flex w-36 shrink-0 items-center justify-between rounded'
                    >
                      <div className='flex items-center gap-2'>
                        <FormLabel>Due Date</FormLabel>
                      </div>
                      <ChevronDownIcon className='text-foreground/50! size-4' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-[250px] overflow-hidden p-0'
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={date => {
                        field.onChange(date)
                        setIsDatePickerOpen(false)
                      }}
                      disabled={date => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>

                <FormControl>
                  <div className='bg-muted flex h-9 flex-1 items-center gap-2 rounded px-2'>
                    {field.value && (
                      <>
                        <CalendarIcon className='size-4 shrink-0 opacity-50' />
                        <span className='truncate'>
                          {format(field.value, 'MM.dd.yyyy')}
                        </span>
                      </>
                    )}
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NOTE */}
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
