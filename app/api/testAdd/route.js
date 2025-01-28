import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv();

export const POST = async (request) => {

    // add HASH
    const randomId = Math.random().toString(36).substring(7);
    const hash = {
        id: randomId,
        organizationName: "Test Organization",
        tokenName: "Test Token",
        tokenSymbol: "TT",
        newMemberReward: 10,
        referralReward: 5,
        admin: "0x1234567890",
    }
    await redis.hset(randomId, hash);

    // update newMemberReward in Redis
    await redis.hset(randomId, { newMemberReward: 20 });

    // Return a response to confirm success and the set of numbers
    return NextResponse.json({ success: true, data: { id: randomId, hash: hash } });
};
