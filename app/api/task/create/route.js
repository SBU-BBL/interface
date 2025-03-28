import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

// Initialize Redis from environment settings.
const redis = Redis.fromEnv();

export const POST = async (request) => {
  try {
    const body = await request.json();
    console.log("Received request body:", body);
    const {
      taskName,
      taskDescription,
      taskBalance,
      communityId,
      projId,     // project id from the front end
      address,    // creator's address
      deadline,
      status,     // optional: one of "todo" | "in-progress" | "done"
      priority,   // optional: one of "low" | "medium" | "high"
    } = body;
    
    console.log("Parsed deadline:", deadline, new Date(deadline).toString());
    
    const taskId = uuid();
    
    const task = {
      id: taskId,
      taskName,
      taskDescription,
      status: status || "todo",
      priority: priority || "medium",
      taskBalance: taskBalance || "",
      deadline, // assuming client sends an ISO string
      createdAt: new Date().toISOString(),
      users: taskId + ":users", // store as string reference
      creator: address,
      projectId: projId,
    };
    
    // Convert task fields to non-null strings.
    const safeTask = Object.entries(task).reduce((acc, [key, value]) => {
      acc[key] = value != null ? String(value) : "";
      return acc;
    }, {});
    
    // Save the safeTask object in Redis.
    await redis.hset(taskId, safeTask);
    
    // Add task to project's tasks relationship.
    const projectTasks = communityId + ":" + projId + ":tasks";
    await redis.sadd(projectTasks, taskId);
    
    // Add task to creator's tasks relationship.
    const userTasks = communityId + ":" + address + ":tasks";
    await redis.sadd(userTasks, taskId);
    
    return NextResponse.json({ success: true, task: safeTask });
  } catch (error) {
    console.error("Task creation error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
};
