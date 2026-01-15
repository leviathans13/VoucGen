'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function VoucherPreview({ voucher }) {
  if (!voucher) {
    return (
      <div style={styles.placeholder}>
        <p style={styles.placeholderText}>
          Select a voucher type and click "Generate Voucher" to see the preview
        </p>
      </div>
    );
  }

  const imageUrl = `${API_URL}/uploads/${voucher.imagePath}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `voucher-${voucher.code}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={`Voucher ${voucher.code}`}
          style={styles.image}
        />
      </div>
      
      <div style={styles.info}>
        <p style={styles.infoItem}>
          <strong>Code:</strong> {voucher.code}
        </p>
        <p style={styles.infoItem}>
          <strong>Type:</strong> {voucher.type}
        </p>
        <p style={styles.infoItem}>
          <strong>Created:</strong> {new Date(voucher.createdAt).toLocaleString()}
        </p>
      </div>

      <button onClick={handleDownload} style={styles.downloadButton}>
        Download Voucher
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  placeholder: {
    backgroundColor: 'white',
    padding: '40px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  placeholderText: {
    color: '#9ca3af',
    fontSize: '16px',
  },
  imageContainer: {
    marginBottom: '15px',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
  },
  info: {
    marginBottom: '15px',
  },
  infoItem: {
    margin: '8px 0',
    color: '#555',
  },
  downloadButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#10b981',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
