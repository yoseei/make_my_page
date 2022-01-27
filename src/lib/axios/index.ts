import axios, { AxiosRequestConfig, AxiosResponseTransformer } from "axios";
import humps from "humps";
import PersistenceKeys from "constants/persistenceKeys";

export const HttpClient = axios.create({
  transformResponse: [
    ...((axios.defaults.transformResponse as AxiosResponseTransformer[]) || []),
    (data) => humps.camelizeKeys(data),
  ],
});

HttpClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = { ...config };

  if (config.params) {
    newConfig.params = humps.decamelizeKeys(config.params);
  }
  if (config.data) {
    newConfig.data = humps.decamelizeKeys(config.data);
  }
  return newConfig;
});

const token = localStorage.getItem(PersistenceKeys.TOKEN);

if (token) {
  HttpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}
