'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Footer from '@/components/layout/Footer';
import { Zap, Shield, Globe, Smartphone, CreditCard, ArrowRight, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Zap size={14} /> <span>#1 Finance App in Cameroon</span>
            </div>
            <h1 className={styles.heroTitle}>
              The Future of <br />
              <span className={styles.gradientText}>Mobile Money</span> is Here
            </h1>
            <p className={styles.heroSubtitle}>
              Send money, pay bills, and manage your finances with OpayCam.
              Experience the fastest, most secure, and reliable payment platform built for you.
            </p>
            <div className={styles.heroActions}>
              {!isAuthenticated && (
                <>
                  <Link href="/signup">
                    <Button variant="primary" size="large" className={styles.glowBtn}>
                      Get Started Free <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="large">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <Link href="/dashboard">
                  <Button variant="primary" size="large" className={styles.glowBtn}>
                    Go to Dashboard <ArrowRight size={18} />
                  </Button>
                </Link>
              )}
            </div>
            <div className={styles.trustRow}>
              <div className={styles.trustItem}>
                <CheckCircle size={16} className={styles.trustIcon} /> <span>Licensed by COBAC</span>
              </div>
              <div className={styles.trustItem}>
                <CheckCircle size={16} className={styles.trustIcon} /> <span>Bank-Grade Security</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.phoneMockup}>
              <div className={styles.phoneScreen}>
                {/* Simulated App UI */}
                <div className={styles.appHeader}>
                  <div className={styles.appAvatar}>JD</div>
                  <div className={styles.appUser}>
                    <div className={styles.appGreeting}>Hello, John</div>
                    <div className={styles.appId}>ID: 883920</div>
                  </div>
                </div>
                <div className={styles.appCard}>
                  <div className={styles.cardLabel}>Total Balance</div>
                  <div className={styles.cardBalance}>₣ 1,250,000</div>
                  <div className={styles.cardChip}>VISA</div>
                </div>
                <div className={styles.appActions}>
                  <div className={styles.appBtn}><div className={styles.btnIcon}>💸</div>Send</div>
                  <div className={styles.appBtn}><div className={styles.btnIcon}>📱</div>Top-up</div>
                  <div className={styles.appBtn}><div className={styles.btnIcon}>🧾</div>Bills</div>
                  <div className={styles.appBtn}><div className={styles.btnIcon}>MORE</div></div>
                </div>
                <div className={styles.appTrans}>
                  <div className={styles.transTitle}>Recent Activity</div>
                  <div className={styles.transItem}>
                    <div className={styles.transIcon}>N</div>
                    <div className={styles.transInfo}>
                      <div className={styles.transName}>Netflix</div>
                      <div className={styles.transDate}>Today, 10:23 AM</div>
                    </div>
                    <div className={styles.transAmount}>-₣ 4,500</div>
                  </div>
                  <div className={styles.transItem}>
                    <div className={styles.transIcon}>S</div>
                    <div className={styles.transInfo}>
                      <div className={styles.transName}>Salary</div>
                      <div className={styles.transDate}>Yesterday</div>
                    </div>
                    <div className={styles.transAmountGreen}>+₣ 450,000</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className={`${styles.floatCard} ${styles.float1}`}>
              <div className={styles.floatIcon}>🚀</div>
              <div className={styles.floatText}>
                <div className={styles.floatLabel}>Transfer Sent</div>
                <div className={styles.floatValue}>Success</div>
              </div>
            </div>
            <div className={`${styles.floatCard} ${styles.float2}`}>
              <div className={styles.floatIcon}>🛡️</div>
              <div className={styles.floatText}>
                <div className={styles.floatLabel}>Secure</div>
                <div className={styles.floatValue}>Protected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>500K+</div>
            <div className={styles.statLabel}>Active Users</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>₣2B+</div>
            <div className={styles.statLabel}>Processed Monthly</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>99.99%</div>
            <div className={styles.statLabel}>Uptime Reliability</div>
          </div>
        </div>
      </section>

      {/* Partners Scroll Section */}
      <section className={styles.partners}>
        <div className={styles.partnersTitle}>Trusted by industry leaders</div>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {/* Duplicate items for seamless loop - 4 sets of partners */}
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} style={{ display: 'flex', gap: '80px' }}>
                <div className={styles.partnerItem}>
                  <div className={styles.partnerLogo}>Altonixa</div>
                </div>
                <div className={styles.partnerItem}>
                  <div className={styles.partnerLogo}>Fapshi</div>
                </div>
                <div className={styles.partnerItem}>
                  <div className={styles.partnerLogo}>MeSomb</div>
                </div>
                <div className={styles.partnerItem}>
                  <div className={styles.partnerLogo}>Our Partners</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Everything You Need</h2>
            <p className={styles.sectionSubtitle}>
              Powerful features designed to give you complete control over your financial life.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <Card className={styles.featureCard} padding="large" shadow="medium" hover>
              <div className={styles.featureIconBox}><Globe size={24} /></div>
              <h3 className={styles.featureTitle}>Global Transfers</h3>
              <p className={styles.featureText}>
                Send money to over 20 countries instantly. Best exchange rates guaranteed.
              </p>
            </Card>

            <Card className={styles.featureCard} padding="large" shadow="medium" hover>
              <div className={styles.featureIconBox}><CreditCard size={24} /></div>
              <h3 className={styles.featureTitle}>Virtual Cards</h3>
              <p className={styles.featureText}>
                Create unlimited virtual cards for safe online shopping and subscriptions.
              </p>
            </Card>

            <Card className={styles.featureCard} padding="large" shadow="medium" hover>
              <div className={styles.featureIconBox}><Smartphone size={24} /></div>
              <h3 className={styles.featureTitle}>Bill Payments</h3>
              <p className={styles.featureText}>
                Pay electricity, water, internet, and TV bills instantly with zero fees.
              </p>
            </Card>

            <Card className={styles.featureCard} padding="large" shadow="medium" hover>
              <div className={styles.featureIconBox}><Shield size={24} /></div>
              <h3 className={styles.featureTitle}>Bank-Grade Security</h3>
              <p className={styles.featureText}>
                Your funds are protected by end-to-end encryption and biometric security.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>Get started in 3 simple steps</p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Create Account</h3>
              <p className={styles.stepText}>Sign up in minutes with just your phone number and ID.</p>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Add Money</h3>
              <p className={styles.stepText}>Deposit funds via Mobile Money, Bank Card, or Agent.</p>
            </div>
            <div className={styles.stepLine}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Start Transacting</h3>
              <p className={styles.stepText}>Send money, pay bills, and shop online instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to join the revolution?</h2>
          <p className={styles.ctaText}>
            Join over 500,000 Cameroonians who trust OpayCam for their daily financial needs.
          </p>
          <Link href="/signup">
            <Button variant="primary" size="large" className={styles.ctaBtn}>
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
