import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // Se precisar de repositórios privados depois:
      // authorization: { params: { scope: "read:user repo" } },
    }),
  ],
  pages: {
    signIn: '/', // redireciona pra home depois do login
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      // pega o access_token do GitHub no login
      if (account?.access_token) {
        (token as any).githubAccessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).githubAccessToken = (token as any).githubAccessToken ?? null;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
