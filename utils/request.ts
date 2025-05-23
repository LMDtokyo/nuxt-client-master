import type { ModifiedFetchResponse } from '~';
import type { IRefreshResponse } from '~/api/auth';
import { ofetch, type FetchRequest, type FetchOptions } from 'ofetch';
import { useAuthStore } from '~/stores/auth';
import { ROUTES as AuthRoutes } from '~/api/auth/auth';

const fetcher = ofetch.create({
  async onRequest({ options }) {
    const auth = useAuthStore();

    if (auth.tokens.access_token) {
      options.headers = { ...options.headers, Authorization: `Bearer ${auth.tokens.access_token}` };
    }
  },
  async onResponse({ response }) {
    const auth = useAuthStore();
    const apiUrl = process.server ? process.env.NUXT_API_URL : useRuntimeConfig().public.apiUrl;
    // Если код ошибки - "Unauthorized" и в сторе есть "refresh_token"
    if (response.status === 401 && auth.tokens.refresh_token) {
      try {
        // Пробуем получить новые токены, если будет ошибка, то делаем logout(), чтобы очистить стор, и выкинуть пользователя
        // а если ошибки нет, то устанавливаем новые токены в стор, а дальше первый запрос где случилась ошибка, повторится ещё раз (см. 53 строку)
        const tokens = await ofetch<IRefreshResponse>(apiUrl + AuthRoutes.refresh, {
          method: 'post',
          body: { refresh_token: auth.tokens.refresh_token }
        });

        auth.setAccessToken(tokens.access_token);
        auth.setRefreshToken(tokens.refresh_token);
      } catch (err) {
        auth.setAccessToken(null);
        auth.setRefreshToken(null);
      }
    }

    if (!response._data) {
      throw new Error('N-API Error: response does not contain a data');
    }
  }
});

const request = async <T = any>(request: FetchRequest, options?: FetchOptions) => {
  request = useRuntimeConfig().public.apiUrl + request;

  try {
    // Выполняем запрос, и возвращаем данные
    const response = await fetcher.raw(request, options);

    return response as ModifiedFetchResponse<T>;
  } catch (err: any) {
    const auth = useAuthStore();
    // Если ошибка со статусом 401 и в сторе есть рефреш токен, значит хук (см. 17 строку) попробует обновить токены, и если у него это получится, то refresh_token получит новое значение
    // а если не получится, то "refresh_token" будет null, а значит проверка не сработает
    if (err.response?.status === 401 && auth.tokens.refresh_token) {
      const response = await fetcher.raw(request, options);

      return response as ModifiedFetchResponse<T>;
    }

    // вот тут надо будет потом почекать, что надо возвращать
    throw err;
  }
};

export default request;
