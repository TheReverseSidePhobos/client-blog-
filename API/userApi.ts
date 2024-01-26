import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (user: any) => {
  const { data } = await $host.post("api/user/registration", user);

  localStorage.setItem("userToken", data.token);
  return jwt_decode(data.token);
};

export const login = async (email: string, password: string) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("userToken", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("userToken", data.token);
  return jwt_decode(data.token);
};

export const getUserById = async (userId: number) => {
  const { data } = await $host.get("api/user/getUserById/" + userId);

  return data;
};
