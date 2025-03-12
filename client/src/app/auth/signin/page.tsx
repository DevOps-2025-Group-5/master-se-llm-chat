"use client";
import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { providerMap } from "../../../utils/auth";
import signInUser from "./signin";

// const signIn: (provider: AuthProvider, formData: FormData) => void = async (
//   provider,
//   formData
// ) => {
//   // try {
//   //   // Simulate an asynchronous sign-in process
//   //   await new Promise<void>((resolve) => {
//   //     setTimeout(() => {
//   //       console.log(
//   //         `Signing in with "${provider.name}" and credentials: ${formData.get("email")}, ${formData.get("password")}`
//   //       );
//   //       resolve();
//   //     }, 300);
//   //   });
//   // } catch (error) {
//   //   console.error("Sign-in failed:", error);
//   // }
//   try {
//     console.log(
//       `Signing in with "${provider.name}" and credentials: ${formData.get("email")}, ${formData.get("password")}`
//     );
//     await signIn(provider, formData);
//   } catch (error) {
//     console.error("Sign-in failed:", error);
//   }
// };

export default function CredentialsSignInPage() {
  return (
    <AppProvider>
      <SignInPage
        signIn={signInUser}
        providers={providerMap}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
