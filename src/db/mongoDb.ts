import {MongoClient} from  'mongodb'
import {Blog, Post} from "./db";

export const port = 3000


const mongoUri = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/";

 const client = new MongoClient(mongoUri)

const db=client.db('projectHW')

export const postsCollection=db.collection<Post>('posts')

export const blogsCollection=db.collection<Blog>('blogs')

export async function runDb(){
    try {
        await client.connect()
        console.log('Connected successful with mongoDB')
    }catch (e) {
        console.log(e +'Connected ERROR with mongoDB')
        await client.close()

    }
}