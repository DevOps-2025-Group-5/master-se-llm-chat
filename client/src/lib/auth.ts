import NextAuth from "next-auth";
import { v4 as uuid } from "uuid";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import { saltAndHashPassword } from "./password";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import schema from "./schema";
import { encode as authEncode } from "next-auth/jwt";

const adapter = PrismaAdapter({ prisma });
const secret = process.env.AUTH_SECRET;

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
  secret: secret,
  // adapter: adapter,
  callbacks: {
    async jwt({ token, user, account, profile, session }) {
      if (token?.provider === "credentials") {
        token.credentials = true;
        // const access_token = await authEncode({
        //   token: {
        //     id: token.sub,
        //   },
        //   salt: "5",
        //   maxAge: 24 * 60 * 60 * 1000,
        //   secret,
        // });
        // token.access_token = access_token;
      }
      if (token?.sessionToken) {
        token.sub = token.id as string;
      }
      console.log("token", token);
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
  // jwt: {
  //   encode: async function (params) {
  //     if (!params.token?.credentials) {
  //       const user = await prisma.user.findFirst({
  //         where: { email: params.token.email },
  //       });
  //       if (!user) {
  //         const newUser = await prisma.user.create({
  //           data: {
  //             id: params.token.id.toString() as string,
  //             email: params.token.email,
  //             name: params.token.name,
  //             username: params.token.name,
  //             image: params.token.image as string,
  //             accounts: {
  //               create: {
  //                 id: params.token.login as string,
  //                 provider: params.token.provider as string,
  //                 type: params.token.type as string,
  //                 providerAccountId: params.token.providerAccountId as string,
  //               },
  //             },
  //           },
  //         });
  //       }
  //     }
  //     if (params.token?.credentials) {
  //       const sessionToken = uuid();
  //       const id = params.token?.sub || (params.token?.id as string);
  //       const access_token = await authEncode({
  //         token: { sessionToken: sessionToken, id },
  //         salt: params.salt,
  //         maxAge: params.maxAge,
  //         secret: params.secret,
  //       });
  //       const curSession = await prisma.session.findFirst({
  //         where: { userId: id },
  //       });
  //       if (!curSession) {
  //         const session = await prisma.user.update({
  //           where: { id: id },
  //           data: {
  //             sessions: {
  //               create: {
  //                 id: params.token.sub.toString() as string,
  //                 sessionToken: access_token,
  //                 expires: new Date(Date.now() + params.maxAge),
  //                 createdAt: new Date(Date.now()),
  //                 updatedAt: new Date(Date.now()),
  //               },
  //             },
  //           },
  //         });
  //       }
  //       return access_token;
  //     }
  //     console.log("params", params);
  //     return authEncode(params);
  //   },
  // },
});
