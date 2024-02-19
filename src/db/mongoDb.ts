import {MongoClient} from  'mongodb'
import {Post} from "./db";


const mongoUri = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/";

 const client = new MongoClient(mongoUri)

const db=client.db('projectHW')

export const postsCollection=db.collection<Post>('posts')

export async function runDb(){
    try {
        await client.connect()
        console.log('Connected successful with mongoDB')
    }catch (e) {
        await client.close()
        console.log('Connected ERROR with mongoDB')
    }
}