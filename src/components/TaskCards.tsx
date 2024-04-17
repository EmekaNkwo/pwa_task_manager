"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import TaskCard from './TaskCard'
import DropIndicator from './DropIndicator'
import AddTask from './AddTask'

export interface Task {
    title: string
    id: string
    column: string
}

interface TaskCardsProps {
    title: string
    headingColor: string
    column: string
    tasks: Array<Task>
    setTasks: Dispatch<SetStateAction<Array<Task>>>
}
const TaskCards = ({ title, headingColor, column, tasks, setTasks }: TaskCardsProps) => {
    const [active, setActive] = useState(false)
    const filtererdTasks = tasks?.filter((task) => task?.column === column)

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Record<string, any>) => {
        e.dataTransfer.setData("cardId", card.id)
    }

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
    }
    const highLightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
        const indicators = getIndicators()
        clearIndicators(indicators)
        const el = getNearestIndicator(e, indicators)
        el.element.style.opacity = "1"
    }

    const clearIndicators = (els?: Element[]) => {
        const indicators = els || getIndicators(); // If els is not provided, get the indicators
        if (Array.isArray(indicators)) { // Check if indicators is an array
            indicators.forEach((el: any) => {
                if (el instanceof HTMLElement) {
                    el.style.opacity = "0";
                }
            });
        }
    };

    const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: Element[]) => {
        const DISTANCE_OFFSET = 50
        const el = indicators.reduce((closest: any, child: Element) => {
            const box = child.getBoundingClientRect()
            const offset = e.clientY - (box.top + DISTANCE_OFFSET)
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1]
        })

        return el
    }
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        highLightIndicator(e)
        setActive(true)
    }

    const handleDragLeave = () => {
        setActive(false)
        clearIndicators()
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        setActive(false)
        clearIndicators()
        const cardId = e.dataTransfer.getData("cardId")
        const indicators = getIndicators()
        const { element } = getNearestIndicator(e, indicators)


        const before = element.dataset.before || "-1"

        if (before !== cardId) {
            let copy = [...tasks]

            let taskToTransfer = copy.find((task) => task?.id === cardId)
            if (!taskToTransfer) {
                return
            }

            taskToTransfer = { ...taskToTransfer, column }
            copy = copy.filter((task) => task?.id !== cardId)
            const moveToBack = before === "-1"

            if (moveToBack) {
                copy.push(taskToTransfer)
            } else {
                const beforeIndex = copy.findIndex((task) => task?.id === before)
                if (beforeIndex === undefined) return
                copy.splice(beforeIndex, 0, taskToTransfer)
            }
            setTasks(copy)
        }
    }



    return (
        <div className=' shrink-0'>
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className={"rounded text-sm text-neutral-400"}>{filtererdTasks?.length}</span>
            </div>
            <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragEnd} className={`h-full rounded-md w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800"}`}>
                {filtererdTasks.map(
                    (task) => (
                        <TaskCard key={task?.id} title={task?.title} id={task?.id} column={task?.column} handleDragStart={handleDragStart} />
                    )
                )}
                <DropIndicator beforeId="-1" column={column} />
                <AddTask column={column} setItems={setTasks || []} />
            </div>

        </div>
    )
}

export default TaskCards