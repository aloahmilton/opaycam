'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface Crypto {
    symbol: string;
    name: string;
    icon: string;
}

const CRYPTOS: Crypto[] = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
    { symbol: 'USDT', name: 'Tether', icon: '₮' },
    { symbol: 'LTC', name: 'Litecoin', icon: 'Ł' },
    { symbol: 'USDC', name: 'USD Coin', icon: '$' },
    { symbol: 'BNB', name: 'Binance Coin', icon: 'B' },
];

export default function CryptoExchangePage() {
    const [tab, setTab] = useState<'buy' | 'sell'>('buy');
    const [amount, setAmount] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');
    const [estimatedAmount, setEstimatedAmount] = useState(0);

    const calculateEstimate = () => {
        if (!amount) return 0;
        // Simple estimation - in production, use real API
        const usdAmount = parseFloat(amount) / 600; // XAF to USD
        const btcRate = 50000; // Simplified BTC price
        return usdAmount / btcRate;
    };

    const handleContinue = () => {
        alert('Transaction creation coming soon! Please add CoinPayments API keys in admin settings.');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Crypto Exchange</h1>
                <p className={styles.subtitle}>Buy and sell cryptocurrency securely</p>
            </div>

            <div className={styles.card}>
                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${tab === 'buy' ? styles.tabActive : ''}`}
                        onClick={() => setTab('buy')}
                    >
                        Buy Crypto
                    </button>
                    <button
                        className={`${styles.tab} ${tab === 'sell' ? styles.tabActive : ''}`}
                        onClick={() => setTab('sell')}
                    >
                        Sell Crypto
                    </button>
                </div>

                {/* Amount Input */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        {tab === 'buy' ? 'Amount to Spend (XAF)' : 'Amount to Sell'}
                    </label>
                    <div className={styles.inputWrapper}>
                        <span className={styles.currencySymbol}>
                            {tab === 'buy' ? 'XAF' : selectedCrypto}
                        </span>
                        <input
                            type="number"
                            className={styles.input}
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                if (tab === 'buy') {
                                    setEstimatedAmount(calculateEstimate());
                                }
                            }}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Crypto Selector */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        {tab === 'buy' ? 'Cryptocurrency to Buy' : 'Cryptocurrency to Sell'}
                    </label>
                    <select
                        className={styles.select}
                        value={selectedCrypto}
                        onChange={(e) => setSelectedCrypto(e.target.value)}
                    >
                        {CRYPTOS.map((crypto) => (
                            <option key={crypto.symbol} value={crypto.symbol}>
                                {crypto.icon} {crypto.name} ({crypto.symbol})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Estimate */}
                {amount && tab === 'buy' && (
                    <div className={styles.estimate}>
                        <div className={styles.estimateRow}>
                            <span>You will receive:</span>
                            <strong>{estimatedAmount.toFixed(8)} {selectedCrypto}</strong>
                        </div>
                        <p className={styles.estimateNote}>
                            Rate updated: {new Date().toLocaleTimeString()}
                        </p>
                    </div>
                )}

                {/* Continue Button */}
                <button
                    className={styles.continueBtn}
                    onClick={handleContinue}
                    disabled={!amount}
                >
                    Continue
                </button>

                {/* Info */}
                <div className={styles.info}>
                    <p>
                        <strong>Note:</strong> To enable live cryptocurrency transactions,
                        please configure your CoinPayments API keys in the admin dashboard.
                    </p>
                </div>

                {/* Popular Cryptos */}
                <div className={styles.popularSection}>
                    <h3 className={styles.sectionTitle}>Popular Cryptocurrencies</h3>
                    <div className={styles.cryptoGrid}>
                        {CRYPTOS.slice(0, 4).map((crypto) => (
                            <button
                                key={crypto.symbol}
                                className={`${styles.cryptoCard} ${selectedCrypto === crypto.symbol ? styles.cryptoCardActive : ''}`}
                                onClick={() => setSelectedCrypto(crypto.symbol)}
                            >
                                <div className={styles.cryptoIcon}>{crypto.icon}</div>
                                <div className={styles.cryptoName}>{crypto.symbol}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
