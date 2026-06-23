import { Router } from '@angular/router';
export function setupFetchInterceptor(router: Router) {
  const ogFetch = window.fetch;

  window.fetch = async function (url, options: any = {}) {
    const urlString = (url instanceof Request) ? url.url : String(url);

    // alleen onze eigen API krijgt de token mee
    const isEigenApi =
      urlString.startsWith('/api') ||
      urlString.includes('localhost') ||
      urlString.includes('127.0.0.1');

    const token = localStorage.getItem('token');

    if (token && isEigenApi) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      };
    }

    const response = await ogFetch(url, options);

    if (response.status === 401) {
      alert('Inlog sessie verlopen!');
      localStorage.removeItem('token');
      await router.navigate(['/login']);
      return response;
    }
    return response;
  }
}
