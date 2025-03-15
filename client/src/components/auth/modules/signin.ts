"use server";
import { type AuthProvider } from "@toolpad/core/SignInPage";
import { signIn } from "@/lib/auth";

const signInUser: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData
) => {
  await signIn(provider.id, formData, { redirectTo: "/" });
};

export default signInUser;
