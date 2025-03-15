import { AuthProvider, AuthResponse, SignInPage } from "@toolpad/core";
import signInUser from "./modules/signin";
import { auth, providerMap, signIn } from "../../lib/auth";
import { redirect } from "next/navigation";
import { handleSubmit } from "./modules/submit";
import { AuthError } from "next-auth";

export const SignIn = async () => {
  const session = await auth();
  console.log(session);
  if (session) {
    redirect("/");
  }

  //   const handleSignIn = async (
  //     provider: AuthProvider,
  //     formData?: any,
  //     callbackUrl?: string
  //   ): Promise<AuthResponse> | void => {
  //     try {
  //       return await signInUser(provider, formData);
  //     } catch (error) {
  //       console.error("Failed to sign in", error);
  //     }
  //   };

  return (
    <SignInPage
      providers={providerMap}
      slotProps={{
        emailField: { autoFocus: false, name: "email" },
        passwordField: { name: "password" },
      }}
      signIn={async (
        provider: AuthProvider,
        formData: FormData,
        callbackUrl?: string
      ) => {
        "use server";
        try {
          return await signIn(provider.id, {
            ...(formData && {
              email: formData.get("email"),
              password: formData.get("password"),
            }),
            redirectTo: callbackUrl ?? "/",
          });
        } catch (error) {
          // The desired flow for successful sign in in all cases
          // and unsuccessful sign in for OAuth providers will cause a `redirect`,
          // and `redirect` is a throwing function, so we need to re-throw
          // to allow the redirect to happen
          // Source: https://github.com/vercel/next.js/issues/49298#issuecomment-1542055642
          // Detect a `NEXT_REDIRECT` error and re-throw it
          if (error instanceof Error && error.message === "NEXT_REDIRECT") {
            throw error;
          }
          // Handle Auth.js errors
          if (error instanceof AuthError) {
            return {
              error:
                error.type === "CredentialsSignin"
                  ? "Invalid credentials."
                  : "An error with Auth.js occurred.",
              type: error.type,
            };
          }
          // An error boundary must exist to handle unknown errors
          return {
            error: "Something went wrong.",
            type: "UnknownError",
          };
        }
      }}
    />
  );
};
