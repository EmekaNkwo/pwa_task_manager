import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Task } from './TaskCards'
import { useCreateTaskMutation } from '@/redux/api/taskApi'
import { message } from 'antd'
import localforage from 'localforage'

interface AddTaskProps {
    column: string
    setItems: Dispatch<SetStateAction<Array<Task>>>
}
const AddTask = ({ column, setItems }: AddTaskProps) => {
    const [text, setText] = useState("")
    const [adding, setAdding] = useState(false)

    const [createTask, { isLoading, isSuccess, isError }] = useCreateTaskMutation()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!text.trim().length) return message.error("Task cannot be empty")

        const newCard = {
            column,
            title: text.trim(),
            id: Math.random().toString()
        }

        if (navigator.onLine) {
            await createTask(newCard)
        } else {
            await localforage.setItem('createPendingTask', newCard);
            setItems((prev) => ([...prev, { ...newCard, _id: newCard.id }]))
        }

    }

    useEffect(() => {
        const handleOnlineEvent = async () => {
            const pendingTask = await localforage.getItem('createPendingTask');
            if (pendingTask) {
                await createTask(pendingTask);
                await localforage.removeItem('createPendingTask');
            }
        };

        window.addEventListener('online', handleOnlineEvent);

        return () => {
            window.removeEventListener('online', handleOnlineEvent);
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            message.success("Task added successfully")
            setText("")
            setAdding(false)
        } else if (isError) {
            message.error("Failed to add task")
        }
    }, [isSuccess, isError])
    return (
        <>{
            adding ? <>
                <form onSubmit={handleSubmit}>
                    <textarea autoFocus placeholder='Add new task...' className='w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-400 focus:outline-0' value={text} onChange={(e) => setText(e.target.value)} />
                    <div className='mt-1.5 flex items-center justify-end gap-1.5'>
                        <button onClick={() => setAdding(false)} className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'>Close </button>
                        <button type='submit' className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral -300'><span>Add</span> <FiPlus />
                        </button>
                    </div>
                </form>
            </> : <button className='flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50' onClick={() => setAdding(true)}>
                {
                    isLoading ? "Adding..." : <> <span>Add Task </span> <FiPlus /></>
                }
            </button>
        }</>
    )
}

export default AddTask