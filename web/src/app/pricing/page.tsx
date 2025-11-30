'use client';

import Footer from '@/components/layout/Footer';
import Button from '@/components/common/Button';
import { Check } from 'lucide-react';

export default function Pricing() {
    return (
        <>
            <main style={{ background: '#f8fafc', padding: '100px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Simple, Transparent Pricing</h1>
                        <p style={{ fontSize: '18px', color: '#64748b' }}>No hidden fees. Choose the plan that fits your needs.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                        {/* Basic Plan */}
                        <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Personal</h3>
                            <div style={{ fontSize: '48px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>Free</div>
                            <p style={{ color: '#64748b', marginBottom: '32px' }}>Perfect for everyday transactions and savings.</p>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155' }}>
                                    <Check size={20} color="#16a34a" /> Free transfers to OpayCam users
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155' }}>
                                    <Check size={20} color="#16a34a" /> Bill payments (0% fee)
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155' }}>
                                    <Check size={20} color="#16a34a" /> 1 Virtual Card
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155' }}>
                                    <Check size={20} color="#16a34a" /> 5% Savings Interest
                                </li>
                            </ul>

                            <Button variant="outline" size="large" fullWidth>Get Started</Button>
                        </div>

                        {/* Pro Plan */}
                        <div style={{ background: '#0f172a', padding: '40px', borderRadius: '24px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#2563eb', color: '#fff', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: '700' }}>POPULAR</div>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Pro</h3>
                            <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px' }}>₣2,000<span style={{ fontSize: '16px', fontWeight: '500', color: '#94a3b8' }}>/mo</span></div>
                            <p style={{ color: '#94a3b8', marginBottom: '32px' }}>For power users who need more flexibility.</p>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Check size={20} color="#3b82f6" /> Everything in Personal
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Check size={20} color="#3b82f6" /> 5 Virtual Cards
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Check size={20} color="#3b82f6" /> Priority Support
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Check size={20} color="#3b82f6" /> 8% Savings Interest
                                </li>
                            </ul>

                            <Button variant="primary" size="large" fullWidth>Upgrade to Pro</Button>
                        </div>

                        {/* Business Plan */}
                        <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>Business</h3>
                            <div style={{ fontSize: '48px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>₣10,000<span style={{ fontSize: '16px', fontWeight: '500', color: '#64748b' }}>/mo</span></div>
                            <p style={{ color: '#64748b', marginBottom: '32px' }}>Complete solution for your business needs.</p>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155' }}>
                                    <Check size={20} color="#16a34a" /> Bulk Payments
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155' }}>
                                    <Check size={20} color="#16a34a" /> API Access
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155' }}>
                                    <Check size={20} color="#16a34a" /> Unlimited Virtual Cards
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155' }}>
                                    <Check size={20} color="#16a34a" /> Dedicated Account Manager
                                </li>
                            </ul>

                            <Button variant="outline" size="large" fullWidth>Contact Sales</Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
