import { Router } from '@angular/router';
import { Auth } from './services/auth';

export function setupFetchInterceptor(router: Router, authService: Auth) {
  const ogFetch = window.fetch;

  window.fetch = async function (url, options: any = {}) {
    const urlString = (url instanceof Request) ? url.url : String(url);

    const isEigenApi =
      urlString.startsWith('/api') ||
      urlString.includes('localhost') ||
      urlString.includes('127.0.0.1');

    const token = authService.getToken();

    if (token && isEigenApi) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      };
    }

    const response = await ogFetch(url, options);

    if (response.status === 401) {
      if (urlString.includes('/memory/login')) {
        return response;
      }
      alert('Inlog sessie verlopen!');
      authService.logout();
      return response;
    }
    return response;
  };
}
