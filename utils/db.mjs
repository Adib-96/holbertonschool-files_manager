import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';

const URL = `mongodb://${DB_HOST}:${PORT}`;

class DBClient {
  constructor() {
    MongoClient.connect(URL, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(DATABASE);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      } else {
        console.log(err.message);
        this.db = false;
      }
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    return this.users.countDocuments();
  }

  async nbFiles() {
    return this.files.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
