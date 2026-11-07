import test from 'node:test';
import assert from 'node:assert/strict';
import { getOrderTotals, getPreviewTotals, referralPreviewChanged, REFERRAL_SUCCESS_MESSAGE } from './orderTotals.js';

test('uses backend total and referral discount for payment summary', () => {
  assert.deepEqual(
    getOrderTotals({ total_amount: '180000.00', referral_total_discount: '20000.00' }, 100000, 2),
    { subtotal: 200000, discount: 20000, total: 180000 },
  );
});

test('falls back to regular subtotal when order has no referral data', () => {
  assert.deepEqual(getOrderTotals({}, 100000, 2), { subtotal: 200000, discount: 0, total: 200000 });
});

test('does not pause checkout when final referral allocation matches preview', () => {
  assert.equal(referralPreviewChanged(
    { applicable: true, total_discount: '20000.00', discounted_attendee_count: 2 },
    { referral_code: 'FRIEND', referral_total_discount: '20000.00', referral_discounted_count: 2 },
  ), false);
});

test('pauses checkout when final referral allocation differs from preview', () => {
  assert.equal(referralPreviewChanged(
    { applicable: true, total_discount: '20000.00', discounted_attendee_count: 2 },
    { referral_code: 'FRIEND', referral_total_discount: '10000.00', referral_discounted_count: 1 },
  ), true);
});

test('uses the requested referral success message', () => {
  assert.equal(REFERRAL_SUCCESS_MESSAGE, 'Kode Referral berhasil digunakan');
});

test('shows original and discounted checkout totals after successful preview', () => {
  assert.deepEqual(
    getPreviewTotals(100000, 2, { applicable: true, total_discount: '20000.00' }),
    { subtotal: 200000, discount: 20000, total: 180000, discounted: true },
  );
});

test('shows regular checkout total when referral preview is inapplicable', () => {
  assert.deepEqual(
    getPreviewTotals(100000, 2, { applicable: false }),
    { subtotal: 200000, discount: 0, total: 200000, discounted: false },
  );
});
