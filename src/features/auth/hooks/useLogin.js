import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/api';

/**
 * Hook untuk logika form Sign In.
 * Mengelola state email, password, error, dan loading.
 *
 * @returns {{ email, setEmail, password, setPassword, error, isLoading, handleSubmit }}
 */
export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.status) {
        // Token sudah disimpan otomatis di authService.login via saveTokens
        localStorage.setItem('userEmail', email);
        window.dispatchEvent(new Event('auth-change'));
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Email atau password salah.');
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, error, isLoading, handleSubmit };
}
