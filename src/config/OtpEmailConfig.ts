// src/config/configuration.ts
export default () => ({
    email: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10) || 587,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  