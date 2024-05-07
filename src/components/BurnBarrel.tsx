"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaFire } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Task } from './TaskCards'
import { useDeleteTaskMutation } from '@/redux/api/taskApi'
import { message } from 'antd'
import localforage from 'localforage'

interface BurnBarrelProps {
    setItems: Dispatch<SetStateAction<Array<Task>>>
}
const BurnBarrel = ({ setItems }: BurnBarrelProps) => {
    const [active, setActive] = useState(false)

    const [deleteTask, { isSuccess, isError }] = useDeleteTaskMutation()

    const onHandleTaskDelete = async (task: Record<string, any>) => {
        await deleteTask({
            data: task
        })
    }

    useEffect(() => {
        const handleOnlineEvent = async () => {
            const pendingTask = await localforage.getItem('deletePendingTask');
            if (pendingTask) {
                await deleteTask({ data: pendingTask });
                await localforage.removeItem('deletePendingTask');
            }
        };

        window.addEventListener('online', handleOnlineEvent);

        return () => {
            window.removeEventListener('online', handleOnlineEvent);
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            message.success("Task deleted successfully")
        } else if (isError) {
            message.error("Failed to delete task")
        }
    }, [isSuccess, isError])


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(true)
    }

    const handleDragLeave = () => {
        setActive(false)
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const cardId = e.dataTransfer.getData("cardId")
        const cardString = e.dataTransfer.getData("card")
        const card = cardString ? JSON.parse(cardString) : null
        setItems((prevItems) => prevItems.filter((item) => item.id !== cardId))
        setActive(false)

        onHandleTaskDelete({
            _id: card?._id
        })
    }

    return (
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragEnd} className={`mt-10 grid h-56  shrink-0 place-content-center rounded border text-3xl ${active ? "border-red-800 bg-red-800/20 text-red-500" : "border-neutral-500 text-neutral-500 bg-neutral-500/20"}`}>{
            active ? <FaFire className='animate-bounce' /> : <FiTrash />
        }</div>
    )
}

export default BurnBarrel