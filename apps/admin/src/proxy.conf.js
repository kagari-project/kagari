module.exports = [
  {
    context: ['/api', '/auth'],
    target: 'http://localhost:3000',
    changeOrigin: true,
    logLevel: 'debug',
    secure: false,
  },
];
