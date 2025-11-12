"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Carregando...</div>;

  if (!session) {
    return (
      <button
        className="px-3 py-2 rounded bg-black text-white"
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        Entrar com GitHub
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span>Olá, {session.user?.name ?? "dev"}!</span>
      <button className="px-3 py-2 rounded border" onClick={() => signOut({ callbackUrl: "/" })}>
        Sair
      </button>
    </div>
  );
}
