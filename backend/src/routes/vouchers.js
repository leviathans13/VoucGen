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
    let code;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!isUnique && attempts < maxAttempts) {
      code = generateVoucherCode(type);
      const existing = await prisma.voucher.findUnique({
        where: { code }
      });
      
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }
    
    if (!isUnique) {
      return res.status(500).json({ error: 'Failed to generate unique code' });
    }
    
    // Generate voucher image
    const imagePath = await generateVoucherImage(code, type);
    
    // Save to database
    const voucher = await prisma.voucher.create({
      data: {
        code,
        type,
        imagePath,
      },
    });
    
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
