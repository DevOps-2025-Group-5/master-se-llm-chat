"use server";
import { signOut } from "../../../utils/auth";

export const handleSignOut = async () => {
    await signOut();
  };