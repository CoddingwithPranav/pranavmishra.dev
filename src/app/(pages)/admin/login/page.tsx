"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      if (result.success) {
        router.push("/admin/upsert");
        toast.success("Login successful!", { id: "login-success" });
      } else {
        toast.error(result.error || "Invalid password.", { id: "login-error" });
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", { id: "unexpected-error" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-8 sm:py-12">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '12px',
            boxShadow: 'var(--shadow-lg)',
          },
          success: {
            style: {
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            },
            iconTheme: {
              primary: 'var(--primary-foreground)',
              secondary: 'var(--primary)',
            },
          },
          error: {
            style: {
              background: 'var(--destructive)',
              color: 'var(--primary-foreground)',
            },
            iconTheme: {
              primary: 'var(--primary-foreground)',
              secondary: 'var(--destructive)',
            },
          },
        }}
      />
      <div className="w-full max-w-md bg-background relative z-20 rounded-xl p-6 sm:p-8 shadow-lg shadow-black/5 dark:shadow-white/5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-secondary font-semibold mb-4 sm:mb-6 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <Label htmlFor="password" className="text-base sm:text-lg text-secondary">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-white/5 dark:bg-black/10 border border-border rounded-lg text-base sm:text-lg text-secondary"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Login
          </Button>
        </form>
      </div>
    </section>
  );
}