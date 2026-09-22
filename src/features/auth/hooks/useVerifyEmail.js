import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '@/services/api';

/**
 * Hook untuk logika halaman Verify Email.
 *
 * @returns {{ email, otp, setOtp, error, success, isLoading, cooldown, handleSubmit, handleResend }}
 */
export function useVerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e, directCode = null) => {
    if (e) e.preventDefault();
    const codeToSubmit = directCode || otp.join('');

    if (codeToSubmit.length !== 6) {
      setError('Masukkan 6-digit kode OTP lengkap.');
      return;
    }

    if (!email) {
      setError('Email tidak ditemukan. Silakan kembali ke halaman daftar.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await authService.verifyEmail(email, codeToSubmit);
      setSuccess('Email berhasil diverifikasi! Mengarahkan ke halaman sign in...');
      setTimeout(() => navigate('/sign-in'), 1200);
    } catch (err) {
      setError(err.message || 'Kode OTP salah atau sudah kadaluarsa.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setError('');
    try {
      await authService.sendVerificationEmail(email);
      setSuccess('Kode OTP baru telah dikirimkan ke email Anda.');
      setCooldown(60);
    } catch (err) {
      setError(err.message || 'Gagal mengirim ulang kode. Coba lagi.');
    }
  };

  return { email, otp, setOtp, error, success, isLoading, cooldown, handleSubmit, handleResend };
}
