import { Injectable, HttpException } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request } from 'express';
import * as http from 'node:http';
import * as https from 'node:https';

@Injectable()
export class InternalClientService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 5000,
      baseURL: process.env.USER_SERVICE_BASE_URL,
      headers: { 'Content-Type': 'application/json' },
      httpAgent: new http.Agent({ keepAlive: false }),
      httpsAgent: new https.Agent({ keepAlive: false }),
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

    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request({
        method,
        url,
        data: req.body,
        ...config,
      });

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error.response) {
      const { status, data } = error.response;
      throw new HttpException(
        {
          timestamp: new Date().toISOString(),
          status: data.status,
          error: data.error || '',
          message: data.message || '',
          path: error.config?.url || '',
        },
        status,
      );
    } else if (error.request) {
      throw new HttpException(
        {
          timestamp: new Date().toISOString(),
          status: 502,
          error: 'Bad Gateway',
          message: 'O servio externo nao responseu',
          path: error.config?.url || 'Unknown Path',
        },
        502,
      );
    } else {
      throw new HttpException(
        {
          timestamp: new Date().toISOString(),
          status: 500,
          error: 'Internal Server Error',
          message: error.message || 'Erro desconhcido',
          path: 'Path descnohecido',
        },
        500,
      );
    }
  }
}
