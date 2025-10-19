import { Button } from '@/shared/components/ui/button'
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
import { Spinner } from '@/shared/components/ui/spinner'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import { Textarea } from '@/shared/components/ui/textarea'
import { type FormMode } from '@/shared/constants'
import { useProjectForm } from '../model'
import { ComingSoonSection } from './coming-soon-section'

type Props = {
  mode?: FormMode
  projectId?: string
  onSuccess?: () => void
}

export const ProjectForm = ({
  mode = 'create',
  projectId,
  onSuccess,
}: Props) => {
  const { form, onSubmit, isLoading, buttonText } = useProjectForm({
    mode,
    projectId,
    onSuccess,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <Tabs defaultValue='details' className='gap-4'>
          <TabsList>
            <TabsTrigger value='details'>Details</TabsTrigger>
            <TabsTrigger value='members'>Members</TabsTrigger>
          </TabsList>

          <TabsContent value='details' className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Project name' {...field} />
                  </FormControl>
                  <FormDescription>The name of the project.</FormDescription>
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
                      rows={4}
                      placeholder='Project description'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The description of the project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value='members'>
            <ComingSoonSection
              title='Team Members'
              description='Invite team members and manage project permissions. This feature is currently under development.'
            />
          </TabsContent>
        </Tabs>

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
