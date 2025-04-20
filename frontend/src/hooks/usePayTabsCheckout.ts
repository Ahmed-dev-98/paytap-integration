import { useState } from 'react';

interface PayTabsResponse {
    redirect_url: string;
}

export const usePayTabsCheckout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const initiateCheckout = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch('http://localhost:3000/payments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create payment');
            }

            const data: PayTabsResponse = await response.json();

            if (data.redirect_url) {
                window.open(data.redirect_url, '_blank');
            } else {
                throw new Error('No redirect URL received');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        initiateCheckout,
        isLoading,
        error,
    };
};