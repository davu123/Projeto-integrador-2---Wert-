const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';

function buildHeaders(customHeaders = {}, withAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (withAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

async function request(path, options = {}) {
  const {
    headers: customHeaders = {},
    withAuth = true,
    body,
    ...rest
  } = options;

  const response = await fetch(`${API_URL}${path}`, {
    headers: buildHeaders(customHeaders, withAuth),
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...rest,
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson && data?.message) ||
      (typeof data === 'string' && data) ||
      'Erro na requisição';
    throw new Error(message);
  }

  return data;
}

const api = {
  get(path, options = {}) {
    return request(path, { method: 'GET', ...options });
  },

  post(path, body, options = {}) {
    return request(path, { method: 'POST', body, ...options });
  },

  put(path, body, options = {}) {
    return request(path, { method: 'PUT', body, ...options });
  },

  patch(path, body, options = {}) {
    return request(path, { method: 'PATCH', body, ...options });
  },

  delete(path, options = {}) {
    return request(path, { method: 'DELETE', ...options });
  },

  login(payload) {
    return request('/auth/login', {
      method: 'POST',
      body: payload,
      withAuth: false,
    });
  },

  getEquipamentos() {
    return request('/equipamentos', { method: 'GET' });
  },

  createEquipamento(payload) {
    return request('/equipamentos', {
      method: 'POST',
      body: payload,
    });
  },
};

export default api;
export { api };