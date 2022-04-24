import { Document, MongoClient, ServerApiVersion, WithId } from 'mongodb';

const uri = "mongodb+srv://MdbAdmin:" + process.env.MONGODB_PASSWORD + "@rq.dd17a.mongodb.net/reposQuest?retryWrites=true&w=majority";

const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

const db = client.db('test')

export default new class database {
    constructor() {

    }

    async collect() {
        try {
            await client.connect()
            const collection = await db.collection('devices').find().toArray()
            return collection
        } finally {
            await client.close();

        }
    }
    async insert(array:any) {
        try {
            await client.connect()
            await db.collection('devices').insertOne(array);
        } finally {
            await client.close();
        }
    }
}