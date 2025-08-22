const { z } = require('zod');

// shared pieces
const email = z.string().email('Invalid email');
const password = z.string().min(8, 'Min 8 characters');

const registerSchema = z.object({
  email,
  password, // could add extra rules here if you want
});

const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password required'),
});

module.exports = { registerSchema, loginSchema };
