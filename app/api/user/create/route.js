import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv();

export const POST = async (request) => {
    const {
        //sig
        address,
        name,
    } = await request.json();

    const user = {
        name: name,
        tasksCompleted: 0,
        communities: address + ":communities",
        dateCreated: new Date().toISOString(),
    }
    await redis.hset(address, user);

    // Return a response to confirm success and the set of numbers
    return NextResponse.json({ success: true, user: user });
};
