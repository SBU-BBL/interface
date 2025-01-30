import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv();

function generateRandomId(len) {
  var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'');
}

export const POST = async (request) => {
  // Parse the request body
  const { 
    //sig
    admin,
    communityName,
    affOrg,
    tokenAddress,
    tokenName,
    tokenSymbol,
    newMemberReward,
    referralReward,
  } = await request.json();

  // generate a random id and check if it already exists
  let randomId = generateRandomId(8);
  let exists = await redis.exists(randomId);
  while (exists) {
    randomId = generateRandomId(8);
    exists = await redis.exists(randomId);
  }

  const community = {
    admin: admin,
    communityName: communityName,
    affiliatedOrganization: affOrg,
    numMembers: 1,
    tokenAddress: tokenAddress,
    tokenName: tokenName,
    tokenSymbol: tokenSymbol,
    newMemberReward: newMemberReward,
    referralReward: referralReward,
    users: randomId + ":users",
    tasks: randomId + ":tasks",
    dateCreated: new Date().toISOString(),
  };
  await redis.hset(randomId, community);

  // Return a response to confirm success
  return NextResponse.json({ success: true, community: community });
};
