import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import { saltAndHashPassword } from "./password";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import schema from "./schema";
import { v4 as uuid } from "uuid";
import { encode as authEncode } from "next-auth/jwt";

const adapter = PrismaAdapter({ prisma });

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      const validated = await schema.parse({
        email: credentials.email,
        password: credentials.password,
      });

      console.log("credentials", credentials);
      const user = await prisma.user.findFirst({
        where: { email: validated.email, password: validated.password },
      });
      console.log("user", user);
      if (!user) {
        throw new Error("Invalid credentials");
      }
      return user;
    },
  }),
  GitHub,
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
// .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  adapter: adapter,
  callbacks: {
    async jwt({ token, user, account, profile, session }) {
      console.log(token);
      if (token?.provider === "credentials") {
        token.credentials = true;
        return token;
      }
      return { ...token, ...user, ...account, ...profile, ...session };
    },
    async session({ session, token, user }) {
      return { ...session, token, ...user };
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    // encode: async function (params) {
    //   if (params.token?.credentials) {
    //     const sessionToken = uuid();
    //     if (!params.token.sub) {
    //       throw new Error("No user ID found in token");
    //     }
    //     const createdSession = await adapter?.createSession?.({
    //       sessionToken: sessionToken,
    //       userId: params.token.sub,
    //       expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //     });
    //     if (!createdSession) {
    //       throw new Error("Failed to create session");
    //     }
    //     return sessionToken;
    //   }
    //   return authEncode(params);
    // },
  },
});
