import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, FolderClosedIcon } from 'lucide-react'
import { CreateCategoryDialog, useFindCategoryNames } from '@/features/category'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/components/ui/sidebar'
import { appRoutes } from '@/shared/config'

export const NavCategories = () => {
  const { data } = useFindCategoryNames()
  const [isOpen, setIsOpen] = useState(false)

  // Открываем секцию когда данные загружены
  useEffect(() => {
    if (data && data.length > 0) {
      setIsOpen(true)
    }
  }, [data])

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible
          asChild
          open={isOpen}
          onOpenChange={setIsOpen}
          className='group/collapsible'
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Categories'>
                <FolderClosedIcon />
                <span>Categories</span>
                <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {data?.map(item => (
                <SidebarMenuSub key={item.id}>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link
                        href={appRoutes.app.tasks.byCategory(item.slug)}
                        prefetch={true}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              ))}
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <CreateCategoryDialog />
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
