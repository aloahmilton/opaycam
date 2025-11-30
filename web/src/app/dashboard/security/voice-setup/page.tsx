'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { useSecurity } from '@/contexts/SecurityContext';
import { Mic, Square, CheckCircle2, Shield, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';

export default function VoiceSetupPage() {
    const router = useRouter();
    const { setupVoiceID } = useSecurity();
    const [step, setStep] = useState<'intro' | 'recording' | 'processing' | 'success'>('intro');
    const [recordingTime, setRecordingTime] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (step === 'recording') {
            interval = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step]);

    const startRecording = () => {
        setStep('recording');
        setRecordingTime(0);
    };

    const stopRecording = async () => {
        setStep('processing');
        await setupVoiceID();
        setStep('success');
    };

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <Card className={styles.card} padding="large">
                    <button className={styles.backBtn} onClick={() => router.back()}>
                        <ArrowLeft size={16} /> Back to Settings
                    </button>

                    {step === 'intro' && (
                        <div className={styles.content}>
                            <div className={styles.iconBox}>
                                <Mic size={48} />
                            </div>
                            <h1 className={styles.title}>Set up Voice ID</h1>
                            <p className={styles.description}>
                                Use your voice to verify high-value transactions. You'll need to repeat a secure phrase 3 times.
                            </p>
                            <div className={styles.phraseBox}>
                                <span className={styles.phraseLabel}>Your Secure Phrase:</span>
                                <span className={styles.phrase}>"My voice is my password"</span>
                            </div>
                            <Button variant="primary" fullWidth onClick={startRecording}>
                                Start Recording
                            </Button>
                        </div>
                    )}

                    {step === 'recording' && (
                        <div className={styles.content}>
                            <div className={`${styles.iconBox} ${styles.recording}`}>
                                <div className={styles.pulse}></div>
                                <Mic size={48} />
                            </div>
                            <h1 className={styles.title}>Listening...</h1>
                            <p className={styles.description}>
                                Say: <strong>"My voice is my password"</strong>
                            </p>
                            <div className={styles.timer}>00:0{recordingTime}</div>
                            <Button variant="danger" fullWidth onClick={stopRecording}>
                                <Square size={16} fill="currentColor" /> Stop Recording
                            </Button>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className={styles.content}>
                            <div className={styles.spinner}></div>
                            <h1 className={styles.title}>Analyzing Voice Pattern...</h1>
                            <p className={styles.description}>Please wait while we secure your voice print.</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className={styles.content}>
                            <div className={`${styles.iconBox} ${styles.success}`}>
                                <CheckCircle2 size={48} />
                            </div>
                            <h1 className={styles.title}>Voice ID Enabled!</h1>
                            <p className={styles.description}>
                                You can now use your voice to authorize transactions.
                            </p>
                            <Button variant="primary" fullWidth onClick={() => router.push('/dashboard/settings')}>
                                Done
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
}
