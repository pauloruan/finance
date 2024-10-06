"use server";

import { signOut } from "@/lib/auth";

export default async function logout() {
  try {
    await signOut();
  } catch (e) {
    throw e;
  }
}
