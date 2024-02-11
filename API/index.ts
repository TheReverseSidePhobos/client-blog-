import { base_url } from "@/app/constants";
import axios from "axios";

const $host = axios.create({
  baseURL: base_url,
});

const $authHost = axios.create({
  baseURL: base_url,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("userToken")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
