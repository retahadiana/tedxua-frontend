import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { Camera, CameraOff, Loader2 } from 'lucide-react';

// ============================================================================
// QR SCANNER — Akses kamera device dan baca QR code lewat jsQR
// ============================================================================
// Props:
//   onDetect: (rawText: string) => void   dipanggil saat QR terbaca. QR yang
//             sama tidak dikirim ulang dalam 2500 ms; scanner terus
//             membaca sampai komponen ini di-unmount (kamera ikut mati).
//   paused?: boolean   true = berhenti membaca frame (kamera dimatikan)
//
// Catatan: getUserMedia hanya jalan di HTTPS atau http://localhost.
// ============================================================================

const SCAN_INTERVAL_MS = 120;
const MAX_FRAME_WIDTH = 640;
const REPEAT_GUARD_MS = 2500;

function describeCameraError(err) {
  if (!navigator.mediaDevices?.getUserMedia) {
    return 'Kamera tidak tersedia. Buka halaman ini lewat HTTPS (atau localhost) dan pakai browser yang mendukung kamera.';
  }
  switch (err?.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'Izin kamera ditolak. Aktifkan izin kamera untuk situs ini di pengaturan browser, lalu coba lagi.';
    case 'NotFoundError':
    case 'OverconstrainedError':
      return 'Kamera tidak ditemukan di perangkat ini. Gunakan input kode manual.';
    case 'NotReadableError':
      return 'Kamera sedang dipakai aplikasi lain. Tutup aplikasi itu lalu coba lagi.';
    default:
      return 'Gagal membuka kamera. Coba lagi atau gunakan input kode manual.';
  }
}

export default function QrScanner({ onDetect, paused = false }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const onDetectRef = useRef(onDetect);
  const lastRef = useRef({ text: '', at: 0 });
  const [status, setStatus] = useState('starting'); // starting | active | error
  const [errorMessage, setErrorMessage] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    onDetectRef.current = onDetect;
  }, [onDetect]);

  useEffect(() => {
    if (paused) return undefined;

    let cancelled = false;
    let stream = null;
    let timer = null;

    const stop = () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };

    const tick = () => {
      if (cancelled) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.readyState >= 2 && video.videoWidth > 0) {
        const scale = Math.min(1, MAX_FRAME_WIDTH / video.videoWidth);
        const w = Math.round(video.videoWidth * scale);
        const h = Math.round(video.videoHeight * scale);
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(video, 0, 0, w, h);
        const frame = ctx.getImageData(0, 0, w, h);
        const result = jsQR(frame.data, w, h, { inversionAttempts: 'dontInvert' });
        if (result?.data) {
          const now = Date.now();
          const last = lastRef.current;
          if (result.data !== last.text || now - last.at > REPEAT_GUARD_MS) {
            lastRef.current = { text: result.data, at: now };
            onDetectRef.current?.(result.data);
          }
        }
      }
      timer = setTimeout(tick, SCAN_INTERVAL_MS);
    };

    const start = async () => {
      setStatus('starting');
      setErrorMessage('');
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported');
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        const video = videoRef.current;
        video.srcObject = stream;
        video.setAttribute('playsinline', 'true');
        await video.play();
        setStatus('active');
        tick();
      } catch (err) {
        if (cancelled) return;
        setStatus('error');
        setErrorMessage(describeCameraError(err));
      }
    };

    start();
    return stop;
  }, [paused, attempt]);

  if (status === 'error') {
    return (
      <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-ted-red">
          <CameraOff size={24} />
        </div>
        <p className="max-w-xs text-sm text-gray-600">{errorMessage}</p>
        <button
          type="button"
          onClick={() => setAttempt((n) => n + 1)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Camera size={14} />
          <span>Coba lagi</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-900">
      <video ref={videoRef} muted playsInline className="h-full w-full object-cover" />
      <canvas ref={canvasRef} className="hidden" />

      {status === 'starting' && !paused && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-900 text-gray-300">
          <Loader2 size={24} className="animate-spin" />
          <span className="text-xs">Membuka kamera...</span>
        </div>
      )}

      {status === 'active' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-3/5 w-3/5 rounded-2xl border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]" />
        </div>
      )}
    </div>
  );
}
