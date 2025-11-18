"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage({ params }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`/api/user/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchData();
  }, [params.id]);

  if (!user)
    return (
       <div className="flex items-center justify-center min-h-screen min-w-screen py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex justify-center pt-20 p-4">
      <Card className="w-full max-w-lg bg-neutral-900 border-neutral-800 rounded-2xl shadow-xl">
        <CardContent className="p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24 border-2 border-neutral-700">
              <AvatarImage src={user.profileImage || ""} />
              <AvatarFallback className="bg-neutral-700 text-white text-2xl">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-neutral-400">Profile Overview</p>
          </div>

          <div className="space-y-4 text-lg">
            <div className="flex justify-between border-b border-neutral-700 pb-2">
              <span className="text-neutral-400">Email:</span>
              <span>{user.email}</span>
            </div>

            <div className="flex justify-between border-b border-neutral-700 pb-2">
              <span className="text-neutral-400">Username:</span>
              <span>{user.username}</span>
            </div>

            <div className="flex justify-between border-b border-neutral-700 pb-2">
              <span className="text-neutral-400">Role:</span>
              <span className="capitalize">{user.role}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
