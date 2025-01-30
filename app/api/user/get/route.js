import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv();

export const GET = async (request) => {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    console.log('address', address);

    // Retrieve the user from Redis
    const user = await redis.hgetall(address);

    if (!user) {
        // Return a response to confirm failure
        return NextResponse.json({ success: false, error: 'User not found' });
    }

    // Return a response to confirm success and the user
    return NextResponse.json({ success: true, user: user });
}