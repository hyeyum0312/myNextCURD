declare global {
  var _mongo: any; // 또는 _mongo에 대한 정확한 타입을 지정하세요.
}

import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://admin:hyeyeon123@cluster0.gtsj6e5.mongodb.net/curd?retryWrites=true&w=majority&appName=Cluster0'
const options:any = { useNewUrlParser: true }
let connectDB:any;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }