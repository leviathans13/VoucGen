'use client';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function VoucherList() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/vouchers`);
      if (!response.ok) {
        throw new Error('Failed to fetch vouchers');
      }
      const data = await response.json();
      setVouchers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.message}>Loading vouchers...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  if (vouchers.length === 0) {
    return <div style={styles.message}>No vouchers generated yet.</div>;
  }

  return (
    <div style={styles.grid}>
      {vouchers.map((voucher) => (
        <div key={voucher.id} style={styles.card}>
          <img
            src={`${API_URL}/uploads/${voucher.imagePath}`}
            alt={`Voucher ${voucher.code}`}
            style={styles.image}
          />
          <div style={styles.cardBody}>
            <h3 style={styles.code}>{voucher.code}</h3>
            <p style={styles.type}>{voucher.type}</p>
            <p style={styles.date}>
              {new Date(voucher.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  cardBody: {
    padding: '15px',
  },
  code: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  type: {
    margin: '0 0 8px 0',
    color: '#666',
  },
  date: {
    margin: 0,
    fontSize: '14px',
    color: '#999',
  },
  message: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '8px',
    color: '#666',
  },
  error: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '8px',
  },
};
