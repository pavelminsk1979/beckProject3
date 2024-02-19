import {MongoClient} from  'mongodb'


const mongoUri = process.env.MONGO_URL || "mongodb://localhost:27017"

export const client = new MongoClient(mongoUri)

export async function runDb(){
    try {
        await client.connect()
        console.log('Connected successful with mongoDB')
    }catch (e) {
        await client.close()
        console.log('Connected ERROR with mongoDB')
    }
}