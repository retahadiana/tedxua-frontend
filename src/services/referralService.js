import api from './api';

export async function previewReferral({ ticket_tier_id, code, attendee_emails }) {
  const response = await api.post('/referrals/preview', {
    ticket_tier_id,
    code,
    attendee_emails,
  });
  return response.data.data;
}

export async function listReferralCodes() {
  const response = await api.get('/referrals');
  return response.data.data;
}

export async function createReferralCode(payload) {
  const response = await api.post('/referrals', payload);
  return response.data.data;
}

export async function setReferralActive(id, is_active) {
  const response = await api.patch(`/referrals/${id}/active`, { is_active });
  return response.data.data;
}

export async function deleteReferralCode(id) {
  const response = await api.delete(`/referrals/${id}`);
  return response.data.data;
}
