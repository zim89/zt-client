'use client'

import { useState } from 'react'
import { BriefcaseBusinessIcon, PlusIcon } from 'lucide-react'
import { useFindProjectNames } from '@/features/project'
import type { ProjectNameResponse } from '@/entities/project'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Label } from '@/shared/components/ui/label'
import { Spinner } from '@/shared/components/ui/spinner'
import { CreateProjectDialog } from './create-project-dialog'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (project: ProjectNameResponse | null) => void
  selectedProjectId?: string | null
}

/**
 * Dialog for selecting a project from the list
 * Supports search and creating new projects
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * const [selectedProject, setSelectedProject] = useState<ProjectNameResponse | null>(null)
 *
 * <SelectProjectDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onSelect={setSelectedProject}
 *   selectedProjectId={selectedProject?.id ?? null}
 * />
 * ```
 */
export const SelectProjectDialog = ({
  open,
  onOpenChange,
  onSelect,
  selectedProjectId,
}: Props) => {
  const [tempSelectedId, setTempSelectedId] = useState<string | null>(
    selectedProjectId ?? null,
  )

  // Fetch all projects
  const { data: projectsData, isLoading } = useFindProjectNames()

  const handleSelect = (projectId: string) => {
    // Toggle selection - if already selected, deselect
    const newSelection = tempSelectedId === projectId ? null : projectId
    setTempSelectedId(newSelection)
  }

  const handleOK = () => {
    const selected =
      projectsData?.find((p: ProjectNameResponse) => p.id === tempSelectedId) ??
      null
    onSelect(selected)
    onOpenChange(false)
  }

  const handleCancel = () => {
    // Reset to original selection
    setTempSelectedId(selectedProjectId ?? null)
    onOpenChange(false)
  }

  const handleReset = () => {
    setTempSelectedId(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='gap-6' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Projects</DialogTitle>
        </DialogHeader>

        {/* Projects List */}
        <Command className='gap-3'>
          <div className='flex items-center gap-2'>
            <CommandInput
              placeholder='Find project...'
              wrapperClassName='flex-1 border rounded-md'
            />

            <CreateProjectDialog
              trigger={
                <Button
                  variant='default'
                  type='button'
                  size='sm'
                  className='gap-2'
                >
                  <PlusIcon className='size-4' />
                  Add Project
                </Button>
              }
              onSuccess={() => {
                // todo: Refresh project list after creation
              }}
            />
          </div>

          <Label className='text-sm font-medium'>Select a project:</Label>

          <CommandList>
            {isLoading && (
              <div className='flex items-center justify-center py-8'>
                <Spinner />
              </div>
            )}

            {!isLoading && (!projectsData || projectsData.length === 0) && (
              <CommandEmpty>No projects found</CommandEmpty>
            )}

            {!isLoading && projectsData && projectsData.length > 0 && (
              <CommandGroup>
                {projectsData.map((project: ProjectNameResponse) => (
                  <CommandItem
                    key={project.id}
                    onSelect={() => handleSelect(project.id)}
                    className='cursor-pointer'
                  >
                    <div className='flex w-full items-center gap-3'>
                      <Checkbox
                        checked={tempSelectedId === project.id}
                        onCheckedChange={() => handleSelect(project.id)}
                        className='size-4'
                      />
                      <BriefcaseBusinessIcon className='size-5' />
                      <span className='flex-1'>{project.name}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>

        <DialogFooter className='sm:justify-between'>
          <Button variant='outline' onClick={handleReset}>
            Reset
          </Button>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleOK}>OK</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
