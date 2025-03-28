import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const communityId = searchParams.get("communityId") || "default";
  const communityProjectsKey = communityId + ":projects";
  const projectIds = await redis.smembers(communityProjectsKey);
  const projects = [];

  for (const id of projectIds) {
    const proj = await redis.hgetall(id);
    if (proj && Object.keys(proj).length > 0) {
      // Ensure the project object includes its id.
      if (!proj.id) {
        proj.id = id;
      }
      projects.push(proj);
    }
  }
  return NextResponse.json({ projects });
};
