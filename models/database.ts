import { Document, MongoClient, ServerApiVersion, WithId } from 'mongodb';

const uri = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@rq.dd17a.mongodb.net/reposQuest?retryWrites=true&w=majority";

const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

const db = client.db('RepoQuest')
function removeUndefined(obj: any = {}) {
    return Object.keys(obj).reduce((acc: any, key: any) => {
        const _acc = acc;
        if (obj[key] !== undefined) _acc[key] = obj[key];
        return _acc;
    }, {})
}
export default new class Database {

    constructor() {

    }

    async insertOne(collection: string, object: {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).insertOne(object);
            return result;
        } finally {
            await client.close();
        }
    }

    async insertMany(collection: string, array: [], ordered = true) {
        try {
            await client.connect()
            const result = await db.collection(collection).insertMany(array, { ordered: ordered });
            return result;
        } finally {
            await client.close();
        }
    }

    async findOne(collection: string, query = {}, projection = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).findOne(removeUndefined(query), projection);
            return result
        } finally {
            await client.close();
        }
    }

    async findAll(collection: string, query = {}, projection = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).find(removeUndefined(query), projection).toArray()
            return result
        } finally {
            await client.close();
        }
    }

    async updateOne(collection: string, query = {}, update: {}, projection = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).updateOne(removeUndefined(query), update, projection)
            return result
        } finally {
            await client.close();
        }
    }

    async updateMany(collection: string, query = {}, update: {}, projection = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).updateMany(removeUndefined(query), update, projection)
            return result
        } finally {
            await client.close();
        }
    }

    async replaceOne(collection: string, query = {}, replacement: {}, projection = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).replaceOne(removeUndefined(query), removeUndefined(replacement), projection)
            return result
        } finally {
            await client.close();
        }
    }

    async deleteOne(collection: string, query = {}, projection = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).deleteOne(removeUndefined(query), projection)
            return result
        } finally {
            await client.close();
        }
    }

    async deleteMany(collection: string, query = {}, projection = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).deleteMany(removeUndefined(query), projection)
            return result
        } finally {
            await client.close();
        }
    }
}
