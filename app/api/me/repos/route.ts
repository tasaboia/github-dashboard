import { gh } from "@/app/lib/github";

export async function GET() {
  const r = await gh("/user/repos?per_page=100&sort=updated");
  return new Response(await r.text(), { status: r.status, headers: r.headers });
}
