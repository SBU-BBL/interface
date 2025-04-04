"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const members = [
  { name: 'BBL Admin', email: 'admin@example.com', role: 'Owner' },
  { name: 'Professor', email: 'prof@example.com', role: 'Professor' },
  { name: 'Team Leader', email: 'tl@example.com', role: 'Team Leader' },
];

const ManageUsers = () => {
  const [teamMembers, setTeamMembers] = useState(members);

  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight">Manage Your Team</h1>
          <p className="text-sm text-muted-foreground">View and edit roles of members in your organization.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Admins ({teamMembers.filter((member) => member.role === 'Owner').length})</CardTitle>
            <CardDescription>These users are very very powerful.</CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.filter((member) => member.role === 'Owner').map((member, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold">{member.name}</h1>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <select
                  value={member.role}
                  onChange={(e) => {
                    const updatedMembers = [...teamMembers];
                    updatedMembers[index].role = e.target.value;
                    setTeamMembers(updatedMembers);
                  }}
                  className="ml-4 p-2 border rounded"
                >
                  <option value="Owner">Owner</option>
                  <option value="Team Leader">Team Leader</option>
                  <option value="Professor">Professor</option>
                  <option value="Member">Member</option>
                </select>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Professors ({teamMembers.filter((member) => member.role === 'Professor').length})</CardTitle>
            <CardDescription>These users are very powerful.</CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.filter((member) => member.role === 'Professor').map((member, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold">{member.name}</h1>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <select
                  value={member.role}
                  onChange={(e) => {
                    const updatedMembers = [...teamMembers];
                    updatedMembers[index].role = e.target.value;
                    setTeamMembers(updatedMembers);
                  }}
                  className="ml-4 p-2 border rounded"
                >
                  <option value="Owner">Owner</option>
                  <option value="Team Leader">Team Leader</option>
                  <option value="Professor">Professor</option>
                  <option value="Member">Member</option>
                </select>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Leaders ({teamMembers.filter((member) => member.role === 'Team Leader').length})</CardTitle>
            <CardDescription>These users are powerful.</CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.filter((member) => member.role === 'Team Leader').map((member, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold">{member.name}</h1>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <select
                  value={member.role}
                  onChange={(e) => {
                    const updatedMembers = [...teamMembers];
                    updatedMembers[index].role = e.target.value;
                    setTeamMembers(updatedMembers);
                  }}
                  className="ml-4 p-2 border rounded"
                >
                  <option value="Owner">Owner</option>
                  <option value="Team Leader">Team Leader</option>
                  <option value="Professor">Professor</option>
                  <option value="Member">Member</option>
                </select>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Members ({teamMembers.filter((member) => member.role === 'Member').length})</CardTitle>
            <CardDescription>These users are not powerful.</CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.filter((member) => member.role === 'Member').map((member, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold">{member.name}</h1>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <select
                  value={member.role}
                  onChange={(e) => {
                    const updatedMembers = [...teamMembers];
                    updatedMembers[index].role = e.target.value;
                    setTeamMembers(updatedMembers);
                  }}
                  className="ml-4 p-2 border rounded"
                >
                  <option value="Owner">Owner</option>
                  <option value="Team Leader">Team Leader</option>
                  <option value="Professor">Professor</option>
                  <option value="Member">Member</option>
                </select>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ManageUsers;
