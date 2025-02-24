import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export const PUT = async (request) => {
  const updatedTask = await request.json();
  const { id } = updatedTask;
  if (!id) {
    return NextResponse.json({ error: "Missing task id" }, { status: 400 });
  }
  await redis.hset(id, updatedTask);
  return NextResponse.json({ success: true, task: updatedTask });
};
