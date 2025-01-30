import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    // Parse the request body
    const {
        //sig
        address,
        taskId,
    } = await request.json();

    const taskUsers = taskId + ":users";
    await redis.sadd(taskUsers, address);

    // Return a response to confirm success
    return NextResponse.json({ success: true });
};
