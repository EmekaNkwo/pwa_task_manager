"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaFire } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Task } from './TaskCards'

interface BurnBarrelProps {
    setItems: Dispatch<SetStateAction<Array<Task>>>
}
const BurnBarrel = ({ setItems }: BurnBarrelProps) => {
    const [active, setActive] = useState(false)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(true)
    }

    const handleDragLeave = () => {
        setActive(false)
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const cardId = e.dataTransfer.getData("cardId")
        setItems((prevItems) => prevItems.filter((item) => item.id !== cardId))
        setActive(false)
    }

    return (
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragEnd} className={`mt-10 grid h-56  shrink-0 place-content-center rounded border text-3xl ${active ? "border-red-800 bg-red-800/20 text-red-500" : "border-neutral-500 text-neutral-500 bg-neutral-500/20"}`}>{
            active ? <FaFire className='animate-bounce' /> : <FiTrash />
        }</div>
    )
}

export default BurnBarrel