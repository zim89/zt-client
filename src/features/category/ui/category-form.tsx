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
import { Textarea } from '@/shared/components/ui/textarea'
import { type FormMode } from '@/shared/constants'
import { useCategoryForm } from '../model'

type Props = {
  mode?: FormMode
  categoryId?: string
  onSuccess?: () => void
}

export const CategoryForm = ({
  mode = 'create',
  categoryId,
  onSuccess,
}: Props) => {
  const { form, onSubmit, isLoading, buttonText } = useCategoryForm({
    mode,
    categoryId,
    onSuccess,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Category name' {...field} />
              </FormControl>
              <FormDescription>The name of the category.</FormDescription>
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
                  placeholder='Category description'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The description of the category.
              </FormDescription>
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
