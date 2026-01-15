export const metadata = {
  title: 'VouchGen - Digital Voucher Generator',
  description: 'Generate custom digital vouchers instantly',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f5f5f5' }}>
        {children}
      </body>
    </html>
  )
}
