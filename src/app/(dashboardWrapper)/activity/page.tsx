'use client'
import BurnBarrel from '@/components/BurnBarrel'
import TaskCards, { Task } from '@/components/TaskCards'
import { taskData } from '@/shared/data/tasksData'
import { PageHeaderText } from '@/shared/ui/headerText'
import React, { useState } from 'react'

const Activity = () => {
    const [tasks, setTasks] = useState<Task[]>(taskData || [])
    return (
        <div>
            <PageHeaderText text="All Activity" />
            <div className="h-[80vh] w-full bg-neutral-900 text-neutral-50">
                <div className="w-full h-full overflow-scroll p-12 gap-3 grid grid-cols-5 ">
                    <TaskCards title="Backlog" headingColor="text-neutral-500" column="backlog" tasks={tasks} setTasks={setTasks} />
                    <TaskCards title="Todo" headingColor="text-yellow-200" column="todo" tasks={tasks} setTasks={setTasks} />
                    <TaskCards title="In Progress" headingColor="text-blue-200" column="inprogress" tasks={tasks} setTasks={setTasks} />
                    <TaskCards title="Done" column="done" headingColor="text-emerald-200" tasks={tasks} setTasks={setTasks} />
                    <BurnBarrel setItems={setTasks} />
                </div>
            </div>
        </div>
    )
}

export default Activity