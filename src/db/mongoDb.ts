import {MongoClient} from  'mongodb'
import { Post} from "./db";
import dotenv from 'dotenv'
import {Blog} from "../allTypes/blogTypes";

export const port = 3000


dotenv.config()


const mongoUri = process.env.MONGO_URL || '';

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