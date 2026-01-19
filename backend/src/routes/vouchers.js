const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');
const { generateVoucherCode } = require('../utils/codeGenerator');
const { generateVoucherImage } = require('../utils/imageGenerator');

// Create a new voucher
router.post('/', async (req, res) => {
  try {
    const { type } = req.body;
    
    if (!type) {
      return res.status(400).json({ error: 'Voucher type is required' });
    }
    
    // Generate unique code with DB validation
    // Try up to 10 times to generate a unique code
    let voucher;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!voucher && attempts < maxAttempts) {
      try {
        const code = generateVoucherCode(type);
        
        // Generate voucher image first
        const imagePath = await generateVoucherImage(code, type);
        
        // Try to create voucher with unique constraint
        voucher = await prisma.voucher.create({
          data: {
            code,
            type,
            imagePath,
          },
        });
      } catch (error) {
        // If unique constraint violation, try again
        if (error.code === 'P2002') {
          attempts++;
          continue;
        }
        throw error;
      }
    }
    
    if (!voucher) {
      return res.status(500).json({ error: 'Failed to generate unique code after multiple attempts' });
    }
    
    res.status(201).json(voucher);
  } catch (error) {
    console.error('Error creating voucher:', error);
    res.status(500).json({ error: 'Failed to create voucher' });
  }
});

// Get all vouchers
router.get('/', async (req, res) => {
  try {
    const vouchers = await prisma.voucher.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(vouchers);
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    res.status(500).json({ error: 'Failed to fetch vouchers' });
  }
});

// Get a specific voucher
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const voucher = await prisma.voucher.findUnique({
      where: { id },
    });
    
    if (!voucher) {
      return res.status(404).json({ error: 'Voucher not found' });
    }
    
    res.json(voucher);
  } catch (error) {
    console.error('Error fetching voucher:', error);
    res.status(500).json({ error: 'Failed to fetch voucher' });
  }
});

module.exports = router;
