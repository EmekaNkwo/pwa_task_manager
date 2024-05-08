"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import DropIndicator from './DropIndicator'
import AddTask from './AddTask'
import { useUpdateTaskMutation } from '@/redux/api/taskApi'
import { message } from 'antd'
import localforage from 'localforage'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { CLEAR_PENDING_TASK_UPDATE, SET_PENDING_TASKS_UPDATE } from '@/redux/slice/pendingTaskSlice'

export interface Task {
    title: string
    id: string
    column: string
    _id: string
}

interface TaskCardsProps {
    title: string
    headingColor: string
    column: string
    tasks: Array<Task>
    setTasks: Dispatch<SetStateAction<Array<Task>>>
}
const TaskCards = ({ title, headingColor, column, tasks, setTasks }: TaskCardsProps) => {
    const dispatch = useAppDispatch()
    const savedPendingTasks = useAppSelector((state) => state.pendingUpdate.pending)
    const [active, setActive] = useState(false)
    const filtererdTasks = tasks?.filter((task) => task?.column === column)
    const [updateTask, { isSuccess, isError }] = useUpdateTaskMutation()


    const pendingTask = localforage.getItem('pendingTask');

    const onHandleTaskUpdate = async (task: Record<string, unknown>) => {

        if (navigator.onLine) {
            await updateTask({ data: task });
        } else {
            await localforage.setItem('pendingTask', task);

        }
    }
    //Todo: Fix the OFfline Sync Issue

    useEffect(() => {
        const handleOnlineEvent = async () => {


            // if (savedPendingTasks?.length > 0) {
            //     console.log("I am here");

            //     for (const task of savedPendingTasks) {
            //         await updateTask({ data: task });
            //     }
            // }
            if (pendingTask) {
                await updateTask({ data: pendingTask });
                await localforage.removeItem('pendingTask');
            }
        };

        window.addEventListener('online', handleOnlineEvent);

        return () => {
            window.removeEventListener('online', handleOnlineEvent);
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            message.success("Task updated successfully")
        } else if (isError) {
            message.error("Failed to update task")

        }
    }, [isSuccess, isError])

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Record<string, any>) => {
        e.dataTransfer.setData("cardId", card.id)
        e.dataTransfer.setData("card", JSON.stringify(card)) // Serialize the card object to a string
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
        const cardString = e.dataTransfer.getData("card") // Retrieve the card object as a string
        const card = cardString ? JSON.parse(cardString) : null

        const indicators = getIndicators()
        const { element } = getNearestIndicator(e, indicators)


        const before = element.dataset.before || "-1"
        const movedToColumn = element.dataset.column

        onHandleTaskUpdate({
            _id: card._id as string,
            column: movedToColumn as string,
        });

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
        <div className={`mt-4 lg:mt-0 `}>
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className={"rounded text-sm text-neutral-400"}>{filtererdTasks?.length}</span>
            </div>
            <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragEnd} className={`rounded-md ${filtererdTasks.length > 0 ? "p-1.5" : "p-1"} w-full transition-colors ${column === "done" ? "min-h-[50px]" : ""} max-h-[400px] lg:max-h-[70vh] overflow-y-auto  ${active ? "bg-neutral-800/50" : "bg-neutral-800"}`}>
                {filtererdTasks.map(
                    (task) => (
                        <TaskCard key={task?.id} task={task} handleDragStart={handleDragStart} />
                    )
                )}
                <DropIndicator beforeId="-1" column={column} />
                {
                    column === "done" ? null : <AddTask column={column} setItems={setTasks || []} />
                }
            </div>

        </div>
    )
}

export default TaskCards