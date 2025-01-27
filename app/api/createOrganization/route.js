import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv();

export const POST = async (request) => {
  // Parse the request body
  const { userAddress, organizationId, organizationName } = await request.json();

  // 1. Retrieve any existing array of organizations for this user
  let existingOrganizations = await redis.get(userAddress);

  // 2. If nothing exists yet, or if the value returned is not an array, initialize it
  if (!Array.isArray(existingOrganizations)) {
    existingOrganizations = [];
  }

  // 3. Add the new organization to the array
  if (!existingOrganizations.some(org => org.organizationId === organizationId)) {
    existingOrganizations.push({ organizationId, organizationName });
  }
  
  // 4. Store the updated array back into Redis
  await redis.set(userAddress, existingOrganizations);

  // Return a response to confirm success
  return NextResponse.json({ success: true, organizations: existingOrganizations });
};
