import type { RegisterSchema } from "hooks/useRegisterForm/useRegisterForm";
import type { RegisterResponse } from "pages/api/register";
import type { FailedResponse, SuccessfullResponse } from "utils/api";
import { getErrorMessage } from "utils/api";
import type { User } from "./types";

const REGISTER_ENDPOINT = "/api/register";
export async function registerNewUser({ email, password }: RegisterSchema) {
  try {
    const response = await fetch(REGISTER_ENDPOINT, {
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
    return JSON.parse(registerResponse.data.user) as User;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
