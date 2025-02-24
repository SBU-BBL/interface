import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export const POST = async (request) => {
    const {
        title,
        description,
        balance,
        communityId,
        address,
        teamLeader,
        teamCoLeaders,
        deadline,
    } = await request.json();

    let projId = uuid();

    const proj = {
        id: projId,
        title,
        description,
        balance,
        teamLeader,
        teamCoLeaders,
        // relationship key for tasks
        tasks: communityId + ":" + projId + ":tasks",
        status: "active",
        deadline,
        createdAt: new Date().toISOString(),
        creator: address
    };
    await redis.hset(projId, proj);

    const communityProjects = communityId + ":projects";
    await redis.sadd(communityProjects, projId);

    return NextResponse.json({ success: true, proj });
};
