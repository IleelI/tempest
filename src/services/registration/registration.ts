import type { RegisterSchema } from "components/auth/hooks/useRegisterForm/useRegisterForm";
import type { RegisterResponse } from "pages/api/register";
import type { FailedResponse, SuccessfullResponse } from "utils/api";
import { getErrorMessage } from "utils/api";
import type { RegisteredUser } from "./types";

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
    return JSON.parse(registerResponse.data.user) as RegisteredUser;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
