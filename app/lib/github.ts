import { getServerSession } from "next-auth";

export async function gh(path: string, init: RequestInit = {}) {
  const session = await getServerSession();
  const token = (session as any)?.githubAccessToken;
  if (!token) return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });

  const headers = new Headers(init.headers);
  headers.set("Accept", "application/vnd.github+json");
  headers.set("Authorization", `token ${token}`);

  return fetch(`https://api.github.com${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}
