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
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    // JWT terdiri dari 3 bagian: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    // exp dalam bentuk detik, Date.now() dalam ms
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true; // Jika error parse token, anggap expired
  }
};

export const checkAndClearExpiredToken = () => {
  const { accessToken } = getTokens();
  if (accessToken && isTokenExpired(accessToken)) {
    clearTokens();
    window.dispatchEvent(new Event('auth-change'));
    return true; // Token expired and cleared
  }
  return false;
};

// Menerjemahkan pesan error raw dari backend menjadi bahasa manusia yang lebih bersahabat
const translateError = (rawMessage) => {
  if (!rawMessage) return 'Terjadi kesalahan pada server.';

  const msg = String(rawMessage).toLowerCase();

  // Validation errors (Gin Validator)
  if (msg.includes('field validation for') || msg.includes('key:')) {
    if (msg.includes('password') && msg.includes('min')) return 'Password harus memiliki minimal 8 karakter.';
    if (msg.includes('email') && msg.includes('email')) return 'Format email tidak valid.';
    return 'Data yang kamu masukkan tidak lengkap atau formatnya salah.';
  }

  // Known backend errors (dari DTO backend)
  const dictionary = {
    'email already exist': 'Email ini sudah terdaftar. Silakan gunakan email lain atau langsung masuk (sign in).',
    'user not found': 'Pengguna tidak ditemukan. Pastikan email kamu sudah benar.',
    'email not found': 'Email tidak terdaftar di sistem kami.',
    'invalid credentials': 'Email atau password yang kamu masukkan salah.',
    'account already verified': 'Akun kamu sudah terverifikasi sebelumnya.',
    'token invalid': 'Kode unik tidak valid atau salah.',
    'token expired': 'Kode/sesi kamu sudah kadaluarsa. Silakan minta ulang.',
    'token not valid': 'Sesi kamu sudah tidak valid.',
    'password reset token invalid': 'Link reset password tidak valid atau sudah kadaluarsa.',
    'failed to create user': 'Gagal membuat akun, silakan coba beberapa saat lagi.',
    'refresh token expired': 'Sesi login kamu sudah habis, silakan login kembali.'
  };

  for (const [key, translated] of Object.entries(dictionary)) {
    if (msg.includes(key)) return translated;
  }

  return rawMessage; // Fallback ke pesan aslinya jika tidak ada di kamus
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

    // Auto-logout jika token tidak valid/expired
    if (response.status === 401) {
      clearTokens();
      window.dispatchEvent(new Event('auth-change'));
      throw new Error('Sesi kamu telah berakhir, silakan login kembali.');
    }

    if (!result.status) {
      const rawError = result.error || result.message || 'Terjadi kesalahan pada server';
      throw new Error(translateError(rawError));
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

export const merchandiseService = {
  getAll: async () => {
    return await apiRequest('/merchandise', { method: 'GET' });
  },
  getById: async (id) => {
    return await apiRequest(`/merchandise/${id}`, { method: 'GET' });
  },
};
