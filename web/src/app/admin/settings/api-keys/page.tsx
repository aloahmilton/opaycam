'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface ApiKey {
    service: string;
    label: string;
    keys: {
        name: string;
        value: string;
        placeholder: string;
    }[];
}

export default function ApiKeysPage() {
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([
        {
            service: 'coinpayments',
            label: 'CoinPayments',
            keys: [
                { name: 'publicKey', value: '', placeholder: 'Public API Key' },
                { name: 'privateKey', value: '', placeholder: 'Private API Key' },
                { name: 'merchantId', value: '', placeholder: 'Merchant ID' },
                { name: 'ipnSecret', value: '', placeholder: 'IPN Secret' },
            ],
        },
        {
            service: 'fapshi',
            label: 'Fapshi',
            keys: [
                { name: 'apiKey', value: '', placeholder: 'API Key' },
                { name: 'apiSecret', value: '', placeholder: 'API Secret' },
            ],
        },
        {
            service: 'mesomb',
            label: 'MeSomb',
            keys: [
                { name: 'apiKey', value: '', placeholder: 'API Key' },
                { name: 'applicationKey', value: '', placeholder: 'Application Key' },
            ],
        },
        {
            service: 'altonixa',
            label: 'Altonixa',
            keys: [
                { name: 'apiKey', value: '', placeholder: 'API Key' },
            ],
        },
    ]);

    const handleKeyChange = (serviceIndex: number, keyIndex: number, value: string) => {
        const newApiKeys = [...apiKeys];
        newApiKeys[serviceIndex].keys[keyIndex].value = value;
        setApiKeys(newApiKeys);
    };

    const toggleKeyVisibility = (service: string, keyName: string) => {
        const key = `${service}-${keyName}`;
        setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = (service: string) => {
        // In production, save to backend/database
        alert(`${service} API keys saved successfully!`);
    };

    const handleTestConnection = async (service: string) => {
        alert(`Testing ${service} connection... (Not implemented yet)`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>API Keys Management</h1>
                <p className={styles.subtitle}>
                    Configure API keys for payment services and integrations
                </p>
            </div>

            <div className={styles.services}>
                {apiKeys.map((service, serviceIndex) => (
                    <div key={service.service} className={styles.serviceCard}>
                        <div className={styles.serviceHeader}>
                            <h2 className={styles.serviceName}>{service.label}</h2>
                            <span className={styles.serviceBadge}>
                                {service.keys.every(k => k.value) ? 'Configured' : 'Not Configured'}
                            </span>
                        </div>

                        <div className={styles.keysGrid}>
                            {service.keys.map((key, keyIndex) => (
                                <div key={key.name} className={styles.keyField}>
                                    <label className={styles.label}>{key.placeholder}</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type={showKeys[`${service.service}-${key.name}`] ? 'text' : 'password'}
                                            className={styles.input}
                                            value={key.value}
                                            onChange={(e) => handleKeyChange(serviceIndex, keyIndex, e.target.value)}
                                            placeholder={key.placeholder}
                                        />
                                        <button
                                            className={styles.toggleBtn}
                                            onClick={() => toggleKeyVisibility(service.service, key.name)}
                                        >
                                            {showKeys[`${service.service}-${key.name}`] ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.actions}>
                            <button
                                className={styles.testBtn}
                                onClick={() => handleTestConnection(service.label)}
                            >
                                Test Connection
                            </button>
                            <button
                                className={styles.saveBtn}
                                onClick={() => handleSave(service.label)}
                            >
                                Save Keys
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.infoBox}>
                <h3>🔒 Security Best Practices</h3>
                <ul>
                    <li>Never share your API keys with anyone</li>
                    <li>Rotate keys regularly for enhanced security</li>
                    <li>Use environment-specific keys (development vs production)</li>
                    <li>Monitor API usage for suspicious activity</li>
                </ul>
            </div>
        </div>
    );
}
