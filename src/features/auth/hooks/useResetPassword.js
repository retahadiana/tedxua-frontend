import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '@/services/api';

/**
 * Hook untuk logika halaman Reset Password.
 *
 * @returns {{ step, setStep, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, success, isLoading, handleSubmitStep1, handleSubmitStep2 }}
 */
export function useResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  const [step, setStep] = useState(token ? 2 : 1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email wajib diisi.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await authService.sendPasswordReset(email);
      setSuccess('Instruksi reset password telah dikirim. Silakan cek kotak masuk email Anda.');
      // Hapus auto-redirect ke step 2 karena user harus klik link dari email yang mengandung token
    } catch (err) {
      setError(err.message || 'Gagal mengirim instruksi. Pastikan email terdaftar.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Semua kolom password wajib diisi.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password baru dan Konfirmasi Password tidak cocok.');
      return;
    }
    if (password.length < 8) {
      setError('Password harus minimal 8 karakter.');
      return;
    }


    // Ambil token dari URL query param (?token=...)
    const resetToken = token || searchParams.get('token') || '';
    if (!resetToken) {
      setError('Token reset tidak ditemukan. Pastikan Anda membuka link dari email.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await authService.resetPassword(resetToken, password);
      setSuccess('Password berhasil diubah! Mengarahkan ke halaman sign in...');
      setTimeout(() => navigate('/sign-in'), 1500);
    } catch (err) {
      let errMsg = err.message || 'Gagal mengubah password. Token mungkin sudah kadaluarsa.';
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

  return {
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    isLoading,
    handleSubmitStep1,
    handleSubmitStep2,
  };
}
