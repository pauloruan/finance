"use server";

import { signIn } from "@/lib/auth";

export default async function login() {
  try {
    await signIn("google", {
      redirectTo: "/",
    });
  } catch (e) {
    throw e;
  }
}
