const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001';
const AUTH_EXPIRED_EVENT = 'ecotrack-auth-expired';

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getStoredToken() {
  return (
    localStorage.getItem('token') ||
    localStorage.getItem('ecotrack-token') ||
    ''
  );
}

function clearStoredAuth() {
  localStorage.removeItem('ecotrack-token');
  localStorage.removeItem('token');
  localStorage.removeItem('ecotrack-user');
  localStorage.removeItem('usuario');
}

function buildHeaders(customHeaders = {}, withAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (withAuth) {
    const token = getStoredToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

async function request(path, rawOptions = {}) {
  const options = isPlainObject(rawOptions) ? rawOptions : {};

  const {
    method = 'GET',
    headers: customHeaders = {},
    withAuth = true,
    body,
    ...rest
  } = options;

  const fetchOptions = {
    method,
    headers: buildHeaders(customHeaders, withAuth),
    ...rest,
  };

  if (!['GET', 'HEAD'].includes(method.toUpperCase()) && body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${path}`, fetchOptions);

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  let data;
  try {
    data = isJson ? await response.json() : await response.text();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 401 && withAuth) {
      clearStoredAuth();
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }

    const message =
      (isJson && data?.message) ||
      (typeof data === 'string' && data) ||
      `Erro ${response.status} na requisição para ${path}`;

    throw new Error(message);
  }

  return data;
}

const api = {
  get(path, options = {}) {
    return request(path, {
      method: 'GET',
      ...(isPlainObject(options) ? options : {}),
    });
  },

  post(path, body, options = {}) {
    return request(path, {
      method: 'POST',
      body,
      ...(isPlainObject(options) ? options : {}),
    });
  },

  put(path, body, options = {}) {
    return request(path, {
      method: 'PUT',
      body,
      ...(isPlainObject(options) ? options : {}),
    });
  },

  patch(path, body, options = {}) {
    return request(path, {
      method: 'PATCH',
      body,
      ...(isPlainObject(options) ? options : {}),
    });
  },

  delete(path, options = {}) {
    return request(path, {
      method: 'DELETE',
      ...(isPlainObject(options) ? options : {}),
    });
  },

  login(payload) {
    return request('/auth/login', {
      method: 'POST',
      body: payload,
      withAuth: false,
    });
  },
};

export default api;
export { api, API_URL, AUTH_EXPIRED_EVENT };
