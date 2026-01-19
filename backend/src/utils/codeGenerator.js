const crypto = require('crypto');

/**
 * Generate a unique voucher code based on the type
 * Format: TYPE-XXXXX where X is alphanumeric
 * @param {string} type - Voucher type (e.g., "Promo Edukasi", "Diskon Game")
 * @returns {string} - Generated code (e.g., "EDU-A7aC1")
 */
function generateVoucherCode(type) {
  // Extract prefix from type
  const prefix = type
    .split(' ')
    .map(word => word.substring(0, 3).toUpperCase())
    .join('')
    .substring(0, 3);
  
  // Generate random alphanumeric string (5 characters)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomPart = '';
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `${prefix}-${randomPart}`;
}

module.exports = { generateVoucherCode };
