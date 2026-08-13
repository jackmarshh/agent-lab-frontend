import { useEffect, useState } from 'react';
import { pingBackend } from '../api/client';
import type { BackendStatus } from '../types';

const POLL_INTERVAL_MS = 10_000;
const RETRY_INTERVAL_MS = 2_500;

/**
 * 后端健康状态轮询：在线时每 10s 探测一次，离线时每 2.5s 快速重试；
 * 页面切回前台时立即重新探测。返回 'online' | 'offline' | 'unknown'。
 */
export function useBackendHealth(): BackendStatus {
  const [status, setStatus] = useState<BackendStatus>('unknown');

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const check = async () => {
      const ok = await pingBackend();
      if (cancelled) return;
      setStatus(ok ? 'online' : 'offline');
      timer = window.setTimeout(check, ok ? POLL_INTERVAL_MS : RETRY_INTERVAL_MS);
    };

    void check();

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        window.clearTimeout(timer);
        void check();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return status;
}
