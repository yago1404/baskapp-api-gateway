import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';

@Injectable()
export class InternalClientService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 5000,
      baseURL: process.env.USER_SERVICE_BASE_URL,
    });
  }

  async get<T>(url: string, req: Request): Promise<T> {
    return this.request<T>('get', url, req);
  }

  async post<T>(url: string, req: Request): Promise<T> {
    return this.request<T>('post', url, req);
  }

  async put<T>(url: string, req: Request): Promise<T> {
    return this.request<T>('put', url, req);
  }

  async delete<T>(url: string, req: Request): Promise<T> {
    return this.request<T>('delete', url, req);
  }

  private async request<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    req: Request,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: req.headers,
    };

    const response: AxiosResponse<T> = await this.axiosInstance.request({
      method,
      url,
      data: req.body,
      ...config,
    });

    return response.data;
  }
}
