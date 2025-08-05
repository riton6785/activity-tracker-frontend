import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch('http://localhost:4000/login/user', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        if (res.ok && data.access_token) {
          return {
            access_token: data.access_token,
            email: data.user.email,
            name: data.user.name,
            id: data.user.id,
          };
        } else {
          return null; // Login failed
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.email = user.email;
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.access_token = token.access_token;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.id = token.id;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET, // Required
};

// App Router handler export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
