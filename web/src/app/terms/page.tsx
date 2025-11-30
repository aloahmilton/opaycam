import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsOfService() {
    return (
        <>
            <Header />
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 64px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>Terms of Service</h1>
                <p style={{ color: '#64748b', marginBottom: '40px' }}>Last updated: November 30, 2025</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#334155', lineHeight: '1.6' }}>
                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>1. Acceptance of Terms</h2>
                        <p>By accessing or using OpayCam, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>2. User Accounts</h2>
                        <p>To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>3. Prohibited Activities</h2>
                        <p>You agree not to engage in any of the following prohibited activities: copying, distributing, or disclosing any part of the Service in any medium, including without limitation by any automated or non-automated "scraping".</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>4. Termination</h2>
                        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
