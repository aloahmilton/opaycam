import Footer from '@/components/layout/Footer';

export default function About() {
    return (
        <>
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 64px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>About OpayCam</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#334155', lineHeight: '1.6' }}>
                    <p style={{ fontSize: '18px', color: '#475569' }}>
                        OpayCam is Cameroon's leading mobile money platform, dedicated to simplifying financial transactions for everyone.
                    </p>

                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>Our Mission</h2>
                        <p>To provide accessible, secure, and affordable financial services to every Cameroonian, bridging the gap between traditional banking and the digital economy.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>Our Vision</h2>
                        <p>A cashless Cameroon where financial freedom is just a tap away.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>Why Choose Us?</h2>
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Instant transactions</li>
                            <li>Lowest fees in the market</li>
                            <li>Bank-grade security</li>
                            <li>24/7 customer support</li>
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
