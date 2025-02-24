import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export const DELETE = async (request) => {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId");
  const taskKey = searchParams.get("taskKey"); // optional
  if (!taskId) {
    return NextResponse.json({ error: "Missing task id" }, { status: 400 });
  }
  await redis.del(taskId);
  if (taskKey) {
    await redis.srem(taskKey, taskId);
  }
  return NextResponse.json({ success: true });
};
