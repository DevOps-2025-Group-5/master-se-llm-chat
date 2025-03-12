"use server";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { signIn } from "@/utils/auth";

const signInUser: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData
) => {
  await signIn(provider.id);
};

export default signInUser;
