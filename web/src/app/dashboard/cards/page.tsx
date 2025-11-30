'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Snowflake, Hash, BarChart3, Trash2 } from 'lucide-react';
import styles from './page.module.css';

export default function CardsPage() {
    return (
        <DashboardLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>My Cards</h1>
                    <Button variant="primary" size="small">+ New Card</Button>
                </div>

                <div className={styles.cardsGrid}>
                    {/* Virtual Card */}
                    <div className={`${styles.creditCard} ${styles.virtual}`}>
                        <div className={styles.cardTop}>
                            <span className={styles.cardChip}></span>
                            <span className={styles.cardType}>VIRTUAL</span>
                        </div>
                        <div className={styles.cardNumber}>4584 •••• •••• 8892</div>
                        <div className={styles.cardBottom}>
                            <div className={styles.cardHolder}>
                                <span>Card Holder</span>
                                <div>JOHN DOE</div>
                            </div>
                            <div className={styles.cardExpiry}>
                                <span>Expires</span>
                                <div>12/26</div>
                            </div>
                            <div className={styles.cardBrand}>VISA</div>
                        </div>
                    </div>

                    {/* Physical Card Placeholder */}
                    <div className={`${styles.creditCard} ${styles.physical}`}>
                        <div className={styles.cardTop}>
                            <span className={styles.cardChip}></span>
                            <span className={styles.cardType}>PHYSICAL</span>
                        </div>
                        <div className={styles.cardNumber}>5399 •••• •••• 4421</div>
                        <div className={styles.cardBottom}>
                            <div className={styles.cardHolder}>
                                <span>Card Holder</span>
                                <div>JOHN DOE</div>
                            </div>
                            <div className={styles.cardExpiry}>
                                <span>Expires</span>
                                <div>09/27</div>
                            </div>
                            <div className={styles.cardBrand}>Mastercard</div>
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <h2 className={styles.sectionTitle}>Card Settings</h2>
                    <div className={styles.controlsGrid}>
                        <Card className={styles.controlCard} padding="medium" hover>
                            <div className={styles.controlIcon}><Snowflake size={24} /></div>
                            <div className={styles.controlLabel}>Freeze Card</div>
                        </Card>
                        <Card className={styles.controlCard} padding="medium" hover>
                            <div className={styles.controlIcon}><Hash size={24} /></div>
                            <div className={styles.controlLabel}>View PIN</div>
                        </Card>
                        <Card className={styles.controlCard} padding="medium" hover>
                            <div className={styles.controlIcon}><BarChart3 size={24} /></div>
                            <div className={styles.controlLabel}>Limits</div>
                        </Card>
                        <Card className={styles.controlCard} padding="medium" hover>
                            <div className={styles.controlIcon}><Trash2 size={24} /></div>
                            <div className={styles.controlLabel}>Block</div>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
