// controllers/AppController.js
import RedisClient from '../utils/redis';
import DBClient from '../utils/db.mjs';

class AppController {
  static async getStatus(req, res) {
    const redisStatus = await RedisClient.isAlive();
    const dbStatus = await DBClient.isAlive();
    res.status(200).json({ redis: redisStatus, db: dbStatus });
  }

  static async getStats(req, res) {
    const usersCount = await DBClient.nbUsers();
    const filesCount = await DBClient.nbFiles();
    res.status(200).json({ users: usersCount, files: filesCount });
  }
}

export default AppController;
