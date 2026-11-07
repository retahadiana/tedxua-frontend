export const REFERRAL_SUCCESS_MESSAGE = 'Kode Referral berhasil digunakan';

export function getPreviewTotals(unitPrice, quantity, preview) {
    const subtotal = unitPrice * quantity;
    const discount = preview?.applicable ? Number(preview.total_discount) || 0 : 0;
    return {
        subtotal,
        discount,
        total: subtotal - discount,
        discounted: discount > 0,
    };
}

export function getOrderTotals(order, unitPrice, quantity) {
    const subtotal = unitPrice * quantity;
    const discount = Number(order?.referral_total_discount) || 0;
    const total = order?.total_amount != null ? Number(order.total_amount) : subtotal - discount;
    return { subtotal, discount, total };
}

export function referralPreviewChanged(preview, order) {
    if (!preview?.applicable || !order?.referral_code) return false;
    return Number(preview.total_discount) !== Number(order.referral_total_discount) ||
        Number(preview.discounted_attendee_count) !== Number(order.referral_discounted_count);
}
