import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';

export default function Careers() {
    return (
        <>
            <Header />
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 64px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>Join Our Team</h1>
                <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '18px' }}>
                    We're always looking for talented individuals to help us revolutionize mobile money in Cameroon.
                </p>
                <div style={{ padding: '40px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>No Open Positions</h3>
                    <p style={{ color: '#64748b', marginBottom: '24px' }}>
                        We currently don't have any open positions. Please check back later!
                    </p>
                    <Button variant="outline" size="medium">Check LinkedIn</Button>
                </div>
            </main>
            <Footer />
        </>
    );
}
