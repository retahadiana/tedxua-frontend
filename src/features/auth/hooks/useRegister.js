import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/api';

/**
 * Hook untuk logika form Sign Up.
 * Mengelola state email, password, confirmPassword, error, dan loading.
 *
 * @returns {{ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, isLoading, handleSubmit }}
 */
export function useRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Semua bidang wajib diisi.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password dan Confirm Password tidak sama.');
      return;
    }
    if (password.length < 8) {
      setError('Password harus minimal 8 karakter.');
      return;
    }


    setError('');
    setIsLoading(true);
    try {
      // Ambil nama dari bagian depan email (sebelum tanda @)
      const nameFromEmail = email.split('@')[0];
      await authService.register(nameFromEmail, email, password);

      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      // Map error backend ke pesan yang lebih ramah jika perlu
      let errMsg = err.message || 'Gagal mendaftar. Coba lagi.';
      if (errMsg.includes('Password') && errMsg.includes('min')) {
        errMsg = 'Password harus minimal 8 karakter.';
      } else if (errMsg.includes('Key:')) {
        errMsg = 'Data yang kamu masukkan belum lengkap atau kurang sesuai.';
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, isLoading, handleSubmit };
}
