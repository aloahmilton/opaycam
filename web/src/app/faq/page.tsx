'use client';

import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "How do I create an account?",
        answer: "Creating an account is simple. Download our mobile app or click 'Sign Up' on our website. You'll need your phone number and a valid ID card."
    },
    {
        question: "Is OpayCam secure?",
        answer: "Yes, security is our top priority. We use bank-grade encryption to protect your data and funds. We are also licensed and regulated by COBAC."
    },
    {
        question: "What are the transaction fees?",
        answer: "Transfers between OpayCam users are free. For other transactions, we offer the lowest rates in the market. Check our Pricing page for details."
    },
    {
        question: "Can I send money internationally?",
        answer: "Yes, you can send money to over 20 countries across Africa directly from your OpayCam wallet."
    },
    {
        question: "How do I contact support?",
        answer: "You can reach our support team 24/7 via the in-app chat, email at support@opaycam.com, or by calling +237 600 000 000."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <main style={{ background: '#f8fafc', padding: '100px 24px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Frequently Asked Questions</h1>
                        <p style={{ fontSize: '18px', color: '#64748b' }}>Have questions? We're here to help.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, index) => (
                            <div key={index} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    style={{
                                        width: '100%',
                                        padding: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>{faq.question}</span>
                                    {openIndex === index ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                                </button>
                                {openIndex === index && (
                                    <div style={{ padding: '0 24px 24px', color: '#475569', lineHeight: '1.6' }}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
