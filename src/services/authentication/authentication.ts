import type { LoginSchema } from "components/user/login/hooks/useLoginForm";
import type { RegistrationSchema } from "components/user/registration/hooks/useRegistrationForm";
import type { LoginResponse } from "pages/api/auth/login";
import type { RegisterResponse } from "pages/api/auth/register";
import type { FailedResponse, SuccessfullResponse } from "utils/api";
import { getErrorMessage } from "utils/api";
import type { User, LoggedUser } from "./types";

const REGISTER_ENDPOINT = "/api/auth/register";
export async function registerNewUser({ email, password }: RegistrationSchema) {
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

const LOGIN_ENDPOINT = "/api/auth/login";
export async function loginUser({ login, password }: LoginSchema) {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      const { error } = data as FailedResponse;
      throw new Error(error);
    }
    const loginResponse = data as SuccessfullResponse<LoginResponse>;
    return {
      user: JSON.parse(loginResponse.data.user),
      token: JSON.parse(loginResponse.data.token),
    } as LoggedUser;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
