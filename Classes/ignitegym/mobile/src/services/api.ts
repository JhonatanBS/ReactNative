import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: "http://192.168.1.7:3333"
}) as APIInstanceProps;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, requestError => {
    if(requestError?.response?.status === 401) {
      if(requestError.response.data?.message === "token.expired" || requestError.response.data?.message === "token.invalid") {
        
      }
    }
    
    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message));
    } else {
      return Promise.reject(requestError);
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}



export { api };