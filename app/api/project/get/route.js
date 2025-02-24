import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json({ error: "Missing project id" }, { status: 400 });
  }
  const proj = await redis.hgetall(projectId);
  if (proj && Object.keys(proj).length > 0) {
    if (!proj.id) {
      proj.id = projectId;
    }
    return NextResponse.json({ project: proj });
  }
  return NextResponse.json({ error: "Project not found" }, { status: 404 });
};
