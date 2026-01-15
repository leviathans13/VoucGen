'use client';
import { useState } from 'react';
import VoucherForm from '../components/VoucherForm';
import VoucherPreview from '../components/VoucherPreview';
import VoucherList from '../components/VoucherList';

export default function Home() {
  const [currentVoucher, setCurrentVoucher] = useState(null);
  const [refreshList, setRefreshList] = useState(0);

  const handleVoucherCreated = (voucher) => {
    setCurrentVoucher(voucher);
    setRefreshList(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        VouchGen - Digital Voucher Generator
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        <div>
          <h2 style={{ marginBottom: '20px', color: '#555' }}>Create Voucher</h2>
          <VoucherForm onVoucherCreated={handleVoucherCreated} />
        </div>
        
        <div>
          <h2 style={{ marginBottom: '20px', color: '#555' }}>Preview</h2>
          <VoucherPreview voucher={currentVoucher} />
        </div>
      </div>
      
      <div>
        <h2 style={{ marginBottom: '20px', color: '#555' }}>Generated Vouchers</h2>
        <VoucherList key={refreshList} />
      </div>
    </div>
  );
}
