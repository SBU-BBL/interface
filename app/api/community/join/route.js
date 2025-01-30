import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export const POST = async (request) => {
    const {
        //sig
        communityId,
        address,
    } = await request.json();

    const communityUsers = communityId + ":users";
    const usersCommunities = address + ":communities";

    await redis.hset(communityUsers, {[address]: 0});
    await redis.sadd(usersCommunities, communityId);

    // Return a response to confirm success and the set of numbers
    return NextResponse.json({ success: true });
};
