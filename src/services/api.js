const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888/api/v1';

export const getTokens = () => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  role: localStorage.getItem('userRole'),
});

export const saveTokens = ({ access_token, refresh_token, role }) => {
  if (access_token) localStorage.setItem('accessToken', access_token);
  if (refresh_token) localStorage.setItem('refreshToken', refresh_token);
  if (role) localStorage.setItem('userRole', role);
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userRole');
};

export const apiRequest = async (endpoint, options = {}) => {
  const { accessToken } = getTokens();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const result = await response.json();

    if (!result.status) {
      throw new Error(result.error || result.message || 'Terjadi kesalahan pada server');
    }

    return result;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
      throw new Error(`Gagal terhubung ke server API backend (${BASE_URL}). Pastikan server backend sudah dijalankan.`);
    }
    throw error;
  }
};


export const authService = {
  register: async (name, email, password) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  verifyEmail: async (email, code) => {
    return await apiRequest('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  },

  sendVerificationEmail: async (email) => {
    return await apiRequest('/auth/send-verification-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  login: async (email, password) => {
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (result.status && result.data) {
      saveTokens(result.data);
    }
    return result;
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      clearTokens();
    }
  },

  sendPasswordReset: async (email) => {
    return await apiRequest('/auth/send-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token, new_password) => {
    return await apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, new_password }),
    });
  },
};

