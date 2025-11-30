import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Press() {
    return (
        <>
            <Header />
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 64px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>Press & Media</h1>
                <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '18px' }}>
                    Resources for journalists and media professionals.
                </p>
                <div style={{ padding: '60px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <p style={{ color: '#64748b', fontSize: '16px' }}>
                        For press inquiries, please contact <a href="mailto:press@opaycam.com" style={{ color: '#2563eb' }}>press@opaycam.com</a>
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
