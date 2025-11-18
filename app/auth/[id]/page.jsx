"use client";

import { use, useEffect, useState } from "react";
import { AtSign, Eye, EyeOff, Lock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Auth({ params }) {
  const [pass, setPass] = useState(false);
  const [sign, setSign] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {

    setSign(params.id);
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sign = await params.id;
    const url = sign == "signup"
      ? `/api/auth/signup`
      : `/api/auth/login`;

    const payload = sign == "signup"
      ? { username, name, email, password }
      : { email, password };
    console.log(payload);
    try {
      console.log(payload, url);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");


      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", data.data.user.username);
        router.push(`/profile/${data.data.user.username}`);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };



  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white p-4">
      <Card className="w-full max-w-md bg-neutral-900 border border-neutral-800 shadow-2xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-center text-3xl font-bold">
            {sign == "signup" ? "Create an Account" : "Sign In"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {sign == "signup" && (
              <>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-5 h-5 text-neutral-400" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="bg-neutral-800 border-neutral-700 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Username</Label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-5 h-5 text-neutral-400" />
                    <Input
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your username"
                      className="bg-neutral-800 border-neutral-700 pl-10"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative flex items-center">
                <AtSign className="absolute left-3 w-5 h-5 text-neutral-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-neutral-800 border-neutral-700 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-5 h-5 text-neutral-400" />
                <Input
                  type={pass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-neutral-800 border-neutral-700 pl-10 pr-10"
                />
                {pass ? (
                  <EyeOff
                    onClick={() => setPass(!pass)}
                    className="absolute right-3 cursor-pointer w-5 h-5 text-neutral-400"
                  />
                ) : (
                  <Eye
                    onClick={() => setPass(!pass)}
                    className="absolute right-3 cursor-pointer w-5 h-5 text-neutral-400"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end text-sm">
              <span className="text-blue-400 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            <Button type="submit" className="glass w-full text-lg rounded-xl">
              {sign == "signup" ? "Sign Up" : "Sign In"}
            </Button>

            <p className="text-center text-sm text-neutral-400">
              {sign == "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <Link
                type="button"
                href={sign == "signup" ? "./login" : "./signup"}
                className="text-blue-400 hover:underline"
              >
                {sign == "signup" ? "Sign In" : "Sign Up"}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}