import Axios, {AxiosRequestConfig, AxiosResponse} from 'axios';


export const api = Axios.create({
  baseURL: 'test',
});

const request = {
  get: <T>(
    endpoint: string,
    options: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<T>> => {
    return api.get(endpoint, options);
  },
  post: (
    endpoint: string,
    data?: unknown,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return api.post(
      endpoint,
    //   options?.headers?.['Content-Type'] === 'multipart/form-data'
    //     ? appendFormData(data as TFormDataAppend)
    //     : Object.assign({}, data),
      options,
    );
  },
  put: (
    endpoint: string,
    data: unknown,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return api.put(endpoint, data, options);
  },
  patch: (
    endpoint: string,
    data?: unknown,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return api.patch(endpoint, Object.assign({}, data), options);
  },
  delete: (
    endpoint: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return api.delete(endpoint, options);
  },
  options: (
    endpoint: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return api.options(endpoint, options);
  },

  head: (
    endpoint: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return api.head(endpoint, options);
  },
};

export default request;
