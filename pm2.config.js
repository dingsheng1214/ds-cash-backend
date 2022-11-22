module.exports = {
  apps: [
    {
      name: 'ds-cash-backend',
      script: 'dist/src/main.js',
      env_production: {
        NODE_ENV: 'prod',
      },
      env_development: {
        NODE_ENV: 'dev',
      },
    },
  ],
};
