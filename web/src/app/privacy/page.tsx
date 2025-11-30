'use client';

import Footer from '@/components/layout/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 64px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>Privacy Policy</h1>
                <p style={{ color: '#64748b', marginBottom: '40px' }}>Last updated: November 30, 2025</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#334155', lineHeight: '1.6' }}>
                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, phone number, and financial information.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about your account and our services.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>3. Information Sharing</h2>
                        <p>We do not share your personal information with third parties except as described in this policy, such as with our banking partners to process transactions or as required by law.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>4. Data Security</h2>
                        <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
