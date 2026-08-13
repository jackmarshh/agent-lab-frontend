import axios from 'axios';

/**
 * 后端 API 基地址。
 * 开发环境默认 '/api'，由 Vite 代理转发到本地后端，无跨域问题；
 * 生产环境通过 .env 的 VITE_API_BASE_URL 覆盖为后端真实地址。
 */
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // Agent 多步推理可能较慢，给足超时
  timeout: 120_000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * 探测后端是否可达：只要服务器有响应（任意 HTTP 状态码）就算在线。
 * 只有网络错误/超时才算离线。
 */
export async function pingBackend(timeoutMs = 4_000): Promise<boolean> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(API_BASE_URL, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
    });
    return true;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timer);
  }
}
