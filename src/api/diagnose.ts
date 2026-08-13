import { apiClient } from './client';
import type { DiagnoseRequest, DiagnoseResponse } from '../types';

export function diagnose(
  payload: DiagnoseRequest,
  signal?: AbortSignal,
): Promise<DiagnoseResponse> {
  return apiClient
    .post<DiagnoseResponse>('/diagnose', payload, { signal })
    .then((res) => res.data);
}
