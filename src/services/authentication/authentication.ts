import type {
  RegisterFailedResponse,
  RegisterSuccessfullResponse,
} from "pages/api/auth/register";
import type { RegisterSchema } from "pages/user";
import { getErrorMessage } from "utils/api";

const REGISTER_ENDPOINT = "/api/auth/register";

export async function registerNewUser({ email, password }: RegisterSchema) {
  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      const { error } = data as RegisterFailedResponse;
      throw new Error(error);
    }
    return data as RegisterSuccessfullResponse;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
