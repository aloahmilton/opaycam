import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <>
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 64px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>Contact Us</h1>
                <p style={{ color: '#64748b', marginBottom: '40px' }}>We're here to help! Reach out to us through any of the channels below.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', marginBottom: '16px' }}>
                            <Mail size={20} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>Email Us</h3>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>support@opaycam.com</p>
                    </div>

                    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ width: '40px', height: '40px', background: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', marginBottom: '16px' }}>
                            <Phone size={20} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>Call Us</h3>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>+237 600 000 000</p>
                    </div>

                    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ width: '40px', height: '40px', background: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', marginBottom: '16px' }}>
                            <MapPin size={20} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>Visit Us</h3>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>Douala, Cameroon</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
