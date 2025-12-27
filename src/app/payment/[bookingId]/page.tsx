'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '@/lib/api';

// Replace with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = ({ bookingId, clientSecret }: { bookingId: string, clientSecret: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setMessage(submitError.message || "Submission Failed");
            setIsProcessing(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/my-bookings`,
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message || "An unexpected error occurred.");
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment Succeeded!");

            // Confirm/Update status on backend
            // In a real app, use webhooks. Here we manually confirm for simplicity.
            try {
                await api.post('/payment/confirm', {
                    bookingId,
                    transactionId: paymentIntent.id
                });
                alert("Payment Successful! Booking Confirmed.");
                router.push('/my-bookings');
            } catch (err) {
                console.error("Backend confirmation failed", err);
                // Even if backend update fails here, webhook should catch it eventually
                router.push('/my-bookings');
            }
        } else {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <button
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
                {isProcessing ? "Processing..." : "Pay Now"}
            </button>
            {message && <div id="payment-message" className="text-red-500 text-sm text-center">{message}</div>}
        </form>
    );
};

export default function PaymentPage() {
    const params = useParams();
    const bookingId = params.bookingId as string;
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        api.post('/payment/create-payment-intent', { bookingId })
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch((err) => console.error("Failed to init payment", err));
    }, [bookingId]);

    const appearance = {
        theme: 'stripe' as const,
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Secure Payment
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Complete your booking securely via Stripe
                    </p>
                </div>

                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm bookingId={bookingId} clientSecret={clientSecret} />
                    </Elements>
                )}
                {!clientSecret && (
                    <div className="text-center py-10">Loading Payment...</div>
                )}
            </div>
        </div>
    );
}
