import React from 'react'
import DropIndicator from './DropIndicator'
import { motion } from "framer-motion"


interface TaskCardProps {
    title?: string
    id: string
    column: string
    handleDragStart: (e: any, card: Record<string, any>) => void

}
const TaskCard = ({ title, id, column, handleDragStart }: TaskCardProps) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div layout layoutId={id} draggable="true" onDragStart={(e) => handleDragStart(e, { title, id, column })} className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'>
                <p className='text-sm text-neutral-100'>
                    {title}</p>
            </motion.div>
        </>
    )
}

export default TaskCard