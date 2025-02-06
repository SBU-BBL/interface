import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
    const searchParams = request.nextUrl.searchParams;
    const communityId = searchParams.get('communityId');
    const projId = searchParams.get('projId');

    console.log('communityId', communityId);

    const tasksKey = communityId + ":" + projId + ":tasks";
    // get set of tasks
    const tasks = await redis.smembers(tasksKey);

    if (!tasks) {
        // Return a response to confirm failure
        return NextResponse.json({ success: false, error: 'Tasks not found' });
    }

    const taskDetails = [];
    for (let i = 0; i < tasks.length; i++) {
        const task = await redis.hgetall(tasks[i]);
        taskDetails.push(task);
    }

    // replace users field with data from tasks[i]:users
    for (let i = 0; i < taskDetails.length; i++) {
        const users = await redis.smembers(tasks[i] + ":users");
        taskDetails[i].users = users;
    }

    // for(let i = 0; i < tasks.length; i++) {
    //     tasks[i] = {
    //         [tasks[i]]: taskDetails[i]
    //     };
    // }

    // Return a response to confirm success and the user
    return NextResponse.json({ success: true, tasks: taskDetails });
};