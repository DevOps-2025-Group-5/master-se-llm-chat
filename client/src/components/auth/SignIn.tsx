import { SignInPage } from "@toolpad/core";
import signInUser from "./modules/signin";
import { auth, providerMap } from "../../lib/auth";
import { redirect } from "next/navigation";

export const SignIn = async () => {
  const session = await auth();
  console.log(session);
  if (session) {
    redirect("/");
  }

  return (
    <SignInPage
      signIn={signInUser}
      providers={providerMap}
      slotProps={{
        emailField: { autoFocus: false },
        form: { noValidate: true },
      }}
    />
  );
};
