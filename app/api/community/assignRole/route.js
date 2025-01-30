import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export const POST = async (request) => {
    const {
        //sig
        communityId,
        address,
        role,
    } = await request.json();

    const user = communityId + ":users"
    await redis.hset(user, {[address]: role});

    // Return a response to confirm success and the set of numbers
    return NextResponse.json({ success: true, role: role });
};
