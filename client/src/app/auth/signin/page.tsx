import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignIn } from "../../../components/auth/SignIn";

const CredentialsSignInPage = () => {
  return (
    <AppProvider>
      <SignIn />
    </AppProvider>
  );
};

export default CredentialsSignInPage;
