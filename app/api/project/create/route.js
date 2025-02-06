import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export const POST = async (request) => {
    // Parse the request body
    const {
        //sig
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
        creator: address,
        title: title,
        description: description,
        balance: balance,
        teamLeader: teamLeader,
        teamCoLeaders: teamCoLeaders,
        tasks: communityId + ":" + projId + ":tasks",
        isComplete: false,
        deadline: deadline,
        dateCreated: new Date().toISOString(),
    };
    await redis.hset(projId, proj);

    const communityProjects = communityId + ":projects";
    await redis.sadd(communityProjects, projId);

    // Return a response to confirm success
    return NextResponse.json({ success: true, proj: proj });
};
