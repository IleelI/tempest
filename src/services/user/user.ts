import type { RegisteredUser } from "../registration/types";
import type { FailedResponse } from "utils/api";

export async function updateUsername(newUsername: string) {
  const response = await fetch("/api/update-user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: newUsername }),
  });
  const data = await response.json();
  if (!response.ok) {
    const { error } = data as FailedResponse;
    throw new Error(error);
  } else {
    return data as { user: RegisteredUser };
  }
}
