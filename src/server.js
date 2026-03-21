require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    let uri = process.env.MONGODB_URI;
    
    // Fallback to memory server if URI is invalid or "mongo"
    if (!uri || uri === 'mongo' || uri.includes('localhost') && process.env.USE_MEMORY_DB === 'true') {
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      logger.info('Using MongoDB Memory Server for testing');
    }

    await mongoose.connect(uri);
    logger.info('Connected to MongoDB');
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (err) {
    logger.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

startServer();
