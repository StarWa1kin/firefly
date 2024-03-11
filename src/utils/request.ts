import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.104.79.165:5263/api",
  timeout: 10 * 1000,
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data;
  }
});

export function GET(url: string, params?: any): Promise<any> {
  return instance.get(url, { params });
}

export function POST(url: string, data: any = {}): Promise<any> {
  return instance.post(url, data);
}
