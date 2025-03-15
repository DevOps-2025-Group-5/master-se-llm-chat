import NextAuth, { AuthError } from "next-auth";
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
      let validated;
      try {
        validated = await schema.parse({
          email: credentials.email,
          password: credentials.password,
        });
      } catch (error) {
        return null;
      }
      const user = await prisma.user.findFirst({
        where: { email: validated.email, password: validated.password },
      });
      console.log("user", user);
      if (!user) {
        return null;
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
  // adapter: adapter,
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
    async authorized({ auth }) {
      console.log("authorized", auth);
      return true;
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
    encode: async function (params) {
      if (!params.token?.credentials) {
        const user = await prisma.user.findFirst({
          where: { email: params.token.email },
        });
        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              id: params.token.id.toString() as string,
              email: params.token.email,
              name: params.token.name,
              username: params.token.name,
              image: params.token.image as string,
              accounts: {
                create: {
                  id: params.token.login as string,
                  provider: params.token.provider as string,
                  type: params.token.type as string,
                  providerAccountId: params.token.providerAccountId as string,
                },
              },
            },
          });
        }
      }
      return authEncode(params);
    },
  },
});
