import { vi } from 'vitest';

global.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  return {
    ok: true,
    status: 200,
    json: async () => ({}),
  } as Response;
});
