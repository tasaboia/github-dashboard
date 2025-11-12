"use client";
import AuthButtons from "./components/AuthButtons";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">GitHub Dashboard</h1>
      <AuthButtons />
    </main>
  );
}
