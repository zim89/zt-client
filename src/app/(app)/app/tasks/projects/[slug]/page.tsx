import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { TasksByProjectPage } from '@/screens/app'
import { projectApi } from '@/entities/project'
import { taskApi } from '@/entities/task'
import { logError } from '@/shared/utils'

type Props = {
  params: Promise<{
    slug: string
  }>
}

const Page = async ({ params }: Props) => {
  const { slug } = await params

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: 1,
      },
    },
  })

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        taskApi.findManyOptions({
          projectSlug: slug,
          limit: 10000,
        }),
      ),
      queryClient.prefetchQuery(projectApi.findBySlugOptions(slug)),
    ])
  } catch (error) {
    logError('❌ Failed to prefetch project data:', error)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksByProjectPage projectSlug={slug} />
    </HydrationBoundary>
  )
}

export default Page
