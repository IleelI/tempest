import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { getErrorMessage } from "utils/api";
import { deleteAccount } from "./user";

export async function handleLogout() {
  try {
    await signOut();
    toast.success("Logged out successfully!");
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
}

export async function handleDeleteAccount() {
  try {
    await deleteAccount();
    handleLogout();
    toast.success("Account deleted successfully!");
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
}
