import type { FailedResponse, SuccessfullResponse } from "utils/api";
import { getErrorMessage } from "utils/api";
import type { RegisterSchema } from "components/auth/hooks/useRegisterForm/useRegisterForm";
import type { RegisterResponse } from "pages/api/register";

export type AppUser = {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  favourite_locations: string[];
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: boolean;
};

const REGISTER_API_ROUTE = "/api/register";
export async function registerUser({ email, password }: RegisterSchema) {
  try {
    const response = await fetch(REGISTER_API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      const { error } = data as FailedResponse;
      throw new Error(error);
    }
    const registerResponse = data as SuccessfullResponse<RegisterResponse>;
    return JSON.parse(registerResponse.data.user) as AppUser;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

const UPDATE_USER_API_ROUTE = "/api/update-user";

export async function updateUsername(newUsername: string) {
  try {
    const response = await fetch(UPDATE_USER_API_ROUTE, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newUsername }),
    });
    const data = await response.json();
    if (!response.ok) {
      const { error } = data as FailedResponse;
      throw new Error(error);
    }
    return data as { user: AppUser };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updatePassword(
  password: string,
  passwordConfirm: string,
  oldPassword: string
) {
  try {
    const response = await fetch(UPDATE_USER_API_ROUTE, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password, passwordConfirm, oldPassword }),
    });
    const data = await response.json();
    if (!response.ok) {
      const { error } = data as FailedResponse;
      throw new Error(error);
    }
    return data as { user: AppUser };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
