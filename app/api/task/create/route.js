import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

// Initialize Redis
const redis = Redis.fromEnv();

export const POST = async (request) => {
    // Parse the request body
    const {
        //sig
        taskName,
        taskDescription,
        taskBalance,
        communityId,
        projId,
        address,
        deadline,
    } = await request.json();

    let taskId = uuid();

    const task = {
        creator: address,
        projectId: projectId,
        taskName: taskName,
        taskDescription: taskDescription,
        taskBalance: taskBalance,
        users: taskId + ":users",
        isComplete: false,
        deadline: deadline,
        dateCreated: new Date().toISOString(),
    };
    await redis.hset(taskId, task);

    const projectTasks = communityId + ":" + projId + ":tasks";
    await redis.sadd(projectTasks, taskId);

    const userTasks = communityId + ":" + address + ":tasks";
    await redis.sadd(userTasks, taskId);

    // Return a response to confirm success
    return NextResponse.json({ success: true, task: task });
};
