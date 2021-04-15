import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';

const BASE_URL = 'http://localhost:3333/api';

@Injectable({ providedIn: 'root' })
export class NetworkingService {

  private static composePath(path: string, id?: string): string {
    const basePath = path.startsWith('/') ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
    return id
      ? (basePath.endsWith('/') ? `${basePath}${id}` : `${basePath}/${id}`)
      : basePath;
  }

  constructor(private httpClient: HttpClient) {}

  get<T>(path: string, queryParams?: HttpParams): Observable<ApiResponse<T>> {
    return this.httpClient.get<ApiResponse<T>>(
      NetworkingService.composePath(path),
      { params: queryParams ?? undefined }
    );
  }

  post<T, Body>(path: string, body: Body): Observable<ApiResponse<T>> {
    return this.httpClient.post<ApiResponse<T>>(NetworkingService.composePath(path), body, { responseType: 'json' });
  }

  put<T, Body>(path: string, body: Body): Observable<ApiResponse<T>> {
    return this.httpClient.put<ApiResponse<T>>(NetworkingService.composePath(path), body, { responseType: 'json' });
  }

  patch<T, Body>(path: string, body: Body): Observable<ApiResponse<T>> {
    return this.httpClient.patch<ApiResponse<T>>(NetworkingService.composePath(path), body, { responseType: 'json' });
  }

  delete<T>(path: string, id: string): Observable<ApiResponse<T>> {
    return this.httpClient.delete<ApiResponse<T>>(NetworkingService.composePath(path, id), { responseType: 'json' });
  }
}
