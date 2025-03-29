export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB || 'mongodb://localhost:27017/one-piece',
  port: process.env.PORT || 3002,
});
