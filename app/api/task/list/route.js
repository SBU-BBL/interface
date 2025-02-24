import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const taskKey = searchParams.get("taskKey");
  if (!taskKey || taskKey.trim() === "") {
    return NextResponse.json({ tasks: [] });
  }
  const taskIds = await redis.smembers(taskKey);
  const tasks = [];
  for (const id of taskIds) {
    const task = await redis.hgetall(id);
    if (task && Object.keys(task).length > 0) tasks.push(task);
  }
  return NextResponse.json({ tasks });
};
