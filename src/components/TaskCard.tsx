import React, { useEffect } from 'react'
import DropIndicator from './DropIndicator'
import { motion } from "framer-motion"
import { Task } from './TaskCards'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Dropdown, MenuProps, message } from 'antd'
import { useDeleteTaskMutation } from '@/redux/api/taskApi'
import localforage from 'localforage'


interface TaskCardProps {
    task: Task,
    handleDragStart: (e: any, card: Record<string, any>) => void

}
const TaskCard = ({ task, handleDragStart }: TaskCardProps) => {
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
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span>
                    Edit task
                </span>
            ),
            disabled: true,
        },
        {
            key: '2',
            label: (
                <span className='text-red-500' onClick={() => {
                    onHandleTaskDelete({
                        _id: task?._id
                    })
                }} >
                    Delete task
                </span>
            ),

        },

    ];
    return (
        <>
            <DropIndicator beforeId={task?.id} column={task?.column} />
            <motion.div layout layoutId={task.id} draggable="true" onDragStart={(e) => handleDragStart(e, { ...task })} className='rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing flex justify-between items-center'>
                <p className=' cursor-grab text-sm text-neutral-100'>
                    {task.title}</p>
                <Dropdown menu={{ items }} placement="bottomLeft" className='cursor-pointer'>
                    <BsThreeDotsVertical />
                </Dropdown>

            </motion.div>
        </>
    )
}

export default TaskCard