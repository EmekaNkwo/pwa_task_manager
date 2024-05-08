'use client'
import BurnBarrel from '@/components/BurnBarrel'
import TaskCards, { Task } from '@/components/TaskCards'
import { useGetTasksQuery } from '@/redux/api/taskApi'
import { PageHeaderText } from '@/shared/ui/headerText'

import React, { useEffect, useState } from 'react'

const Activity = () => {

    const { data } = useGetTasksQuery({})

    const [tasks, setTasks] = useState<Task[]>(data?.data || [])

    useEffect(() => {
        if (data) {
            setTasks(data?.data || [])
        }
    }, [data])

    return (
        <div>
            <PageHeaderText text="All activities" />
            <div className=" text-neutral-50">
                {/* {
                    isLoading ? <div className="w-full h-full flex justify-center items-center">
                        <Spin size='large' />
                    </div> :  */}
                <div className="h-[80vh] rounded-md overflow-y-auto bg-neutral-900 grid p-4 gap-3 grid-cols-1 lg:grid-cols-4 ">
                    <TaskCards title="Backlog" headingColor="text-neutral-500" column="backlog" tasks={tasks} setTasks={setTasks} />
                    <TaskCards title="Todo" headingColor="text-yellow-200" column="todo" tasks={tasks} setTasks={setTasks} />
                    <TaskCards title="In Progress" headingColor="text-blue-200" column="inprogress" tasks={tasks} setTasks={setTasks} />
                    <TaskCards title="Done" column="done" headingColor="text-emerald-200" tasks={tasks} setTasks={setTasks} />

                    {/* In Check */}
                    {/* <BurnBarrel setItems={setTasks} /> */}
                </div>
                {/* } */}
            </div>
        </div>
    )
}

export default Activity