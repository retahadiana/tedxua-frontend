/**
 * ── ORDER CONTEXT ──
 * Menyimpan & berbagi state order antar halaman ticket checkout:
 *   TierSelection → IdentifyStepper → QRISManualPayment → SuccessVerification
 *
 * Data yang disimpan:
 *   - selectedTier:   Data tier yang dipilih user (dari API GET /tickets)
 *   - quantity:       Jumlah tiket (1–5), diatur di QRISManualPayment
 *   - buyerData:      Data pembeli { name, email, phone } dari IdentifyStepper
 *   - currentOrder:   Response order dari POST /api/v1/orders
 *                     { id, order_number, total_amount, expired_at, status, attendee_tickets }
 */
import React, { createContext, useContext, useState, useCallback } from 'react';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
    const [selectedTier, setSelectedTierState] = useState(() => {
        try {
            const saved = sessionStorage.getItem('tedxua_selected_tier');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [quantity, setQuantityState] = useState(() => {
        try {
            const saved = sessionStorage.getItem('tedxua_quantity');
            return saved ? parseInt(saved, 10) : 1;
        } catch {
            return 1;
        }
    });

    const [buyerData, setBuyerDataState] = useState(() => {
        try {
            const saved = sessionStorage.getItem('tedxua_buyer_data');
            return saved ? JSON.parse(saved) : { name: '', email: '', phone: '' };
        } catch {
            return { name: '', email: '', phone: '' };
        }
    });

    const [currentOrder, setCurrentOrderState] = useState(() => {
        try {
            const saved = sessionStorage.getItem('tedxua_current_order');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const setSelectedTier = useCallback((tier) => {
        setSelectedTierState(tier);
        if (tier) {
            sessionStorage.setItem('tedxua_selected_tier', JSON.stringify(tier));
        } else {
            sessionStorage.removeItem('tedxua_selected_tier');
        }
    }, []);

    const setQuantity = useCallback((qty) => {
        setQuantityState(qty);
        sessionStorage.setItem('tedxua_quantity', String(qty));
    }, []);

    const setBuyerData = useCallback((data) => {
        setBuyerDataState(data);
        sessionStorage.setItem('tedxua_buyer_data', JSON.stringify(data));
    }, []);

    const setCurrentOrder = useCallback((order) => {
        setCurrentOrderState(order);
        if (order) {
            sessionStorage.setItem('tedxua_current_order', JSON.stringify(order));
        } else {
            sessionStorage.removeItem('tedxua_current_order');
        }
    }, []);

    const clearOrder = useCallback(() => {
        setSelectedTierState(null);
        setQuantityState(1);
        setBuyerDataState({ name: '', email: '', phone: '' });
        setCurrentOrderState(null);
        sessionStorage.removeItem('tedxua_selected_tier');
        sessionStorage.removeItem('tedxua_quantity');
        sessionStorage.removeItem('tedxua_buyer_data');
        sessionStorage.removeItem('tedxua_current_order');
    }, []);

    return (
        <OrderContext.Provider
            value={{
                selectedTier,
                setSelectedTier,
                quantity,
                setQuantity,
                buyerData,
                setBuyerData,
                currentOrder,
                setCurrentOrder,
                clearOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

/**
 * Hook untuk menggunakan OrderContext.
 * Harus digunakan di dalam <OrderProvider>.
 */
export function useOrder() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
}
