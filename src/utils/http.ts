import axios, { AxiosInstance } from "axios";
import { POST_API } from "../config/path";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: `${POST_API}`,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const http = new Http().instance;
export default http;
