import { NextResponse } from "next/server";
import connectMongoDB from "../config/mongoConnect";
import WorkItem from "../model/workModel";



export async function GET() {
    await connectMongoDB();

    const tasks = await WorkItem.find();
    return NextResponse.json({ data: tasks });
}

export async function POST(req: Request) {
    try {
        const newTask = await req.json();
        await connectMongoDB();

        const missingFields = [];

        if (!newTask.title) missingFields.push("title");
        if (!newTask.column) missingFields.push("column");


        if (missingFields.length > 0) {
            let error_response = {
                status: 400,
                message: `Missing required fields: ${missingFields.join(", ")}`,
            };
            return new NextResponse(JSON.stringify(error_response), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        let json_response = {
            status: "success",
            message: "Task Created",
            data: { ...newTask },
        };

        await WorkItem.create(newTask);
        return new NextResponse(JSON.stringify(json_response), {
            status: 201,
        });
    } catch (error) {

        let error_response = {
            status: "failed",
            message: "Error creating task",
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 409,
        });
    }
}

// implement update task deails

export async function PATCH(req: Request) {
    try {
        const updateData = await req.json();
        const taskId = updateData._id; // Assuming the task ID is passed in the request body

        if (!taskId) {
            return new NextResponse(JSON.stringify({
                status: 400,
                message: "Task ID is required"
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        await connectMongoDB();

        const task = await WorkItem.findByIdAndUpdate(taskId, updateData, { new: true });
        if (!task) {
            return new NextResponse(JSON.stringify({
                status: 404,
                message: "Task not found"
            }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new NextResponse(JSON.stringify({
            status: "success",
            message: "Task updated",
            data: task
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({
            status: "failed",
            message: "Error updating task"
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function DELETE(req: Request) {
    try {
        const deleteData = await req.json();
        const taskId = deleteData._id; // Assuming the task ID is passed in the request body

        if (!taskId) {
            return new NextResponse(JSON.stringify({
                status: 400,
                message: "Task ID is required"
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        await connectMongoDB();

        const task = await WorkItem.findByIdAndDelete(taskId);
        if (!task) {
            return new NextResponse(JSON.stringify({
                status: 404,
                message: "Task not found"
            }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new NextResponse(JSON.stringify({
            status: "success",
            message: "Task deleted",
            data: task
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({
            status: "failed",
            message: "Error deleting task"
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}