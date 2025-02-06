import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
    const searchParams = request.nextUrl.searchParams;
    const communityId = searchParams.get('communityId');
    const projId = searchParams.get('projId');

    console.log('communityId', communityId);
    console.log('projId', projId);

    const tasksKey = communityId + ":" + projId + ":tasks";
    // get set of tasks
    const tasks = await redis.smembers(tasksKey);

    if (!tasks) {
        // Return a response to confirm failure
        return NextResponse.json({ success: false, error: 'Tasks not found' });
    }

    // Return a response to confirm success and the user
    return NextResponse.json({ success: true, tasks: tasks });
};
