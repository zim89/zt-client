'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckIcon, PlusIcon, XIcon } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

type Props = {
  /** Whether the creator is currently active */
  isActive: boolean
  /** Handler to activate the creator */
  onActivate: () => void
  /** Handler to save the task */
  onSave: (name: string) => void
  /** Handler to cancel creation */
  onCancel: () => void
  /** Whether the save operation is loading */
  isLoading?: boolean
  /** Placeholder text for the input */
  placeholder?: string
  /** Button text for creating task */
  buttonText?: string
}

export const CreateTaskInline = ({
  isActive,
  onActivate,
  onSave,
  onCancel,
  isLoading = false,
  placeholder = 'Enter task name...',
  buttonText = 'Add Task',
}: Props) => {
  const [taskName, setTaskName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when creator becomes active
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isActive])

  // Reset state when creator becomes inactive
  useEffect(() => {
    if (!isActive) {
      setTaskName('')
    }
  }, [isActive])

  const handleSave = () => {
    if (taskName.trim()) {
      onSave(taskName.trim())
    }
  }

  const handleCancel = () => {
    setTaskName('')
    onCancel()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (!isActive) {
    return (
      <Button onClick={onActivate} disabled={isLoading}>
        <PlusIcon className='mr-2 h-4 w-4' />
        {buttonText}
      </Button>
    )
  }

  return (
    <div className='bg-background flex items-center space-x-2 rounded-md border p-2'>
      <Input
        ref={inputRef}
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className='flex-1'
      />
      <Button
        size='sm'
        onClick={handleSave}
        disabled={!taskName.trim() || isLoading}
      >
        <CheckIcon className='h-4 w-4' />
      </Button>
      <Button
        size='sm'
        variant='outline'
        onClick={handleCancel}
        disabled={isLoading}
      >
        <XIcon className='h-4 w-4' />
      </Button>
    </div>
  )
}
