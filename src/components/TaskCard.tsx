import React from 'react'
import DropIndicator from './DropIndicator'
import { motion } from "framer-motion"
import { Task } from './TaskCards'


interface TaskCardProps {
    task: Task,
    handleDragStart: (e: any, card: Record<string, any>) => void

}
const TaskCard = ({ task, handleDragStart }: TaskCardProps) => {
    return (
        <>
            <DropIndicator beforeId={task?.id} column={task?.column} />
            <motion.div layout layoutId={task.id} draggable="true" onDragStart={(e) => handleDragStart(e, { ...task })} className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'>
                <p className='text-sm text-neutral-100'>
                    {task.title}</p>
            </motion.div>
        </>
    )
}

export default TaskCard