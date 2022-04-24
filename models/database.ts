import { Document, MongoClient, ServerApiVersion, WithId } from 'mongodb';

const uri = "mongodb+srv://MdbAdmin:" + process.env.MONGODB_PASSWORD + "@rq.dd17a.mongodb.net/reposQuest?retryWrites=true&w=majority";

const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

const db = client.db('RepoQuest')
function removeUndefined(obj: any = {}) {
    return Object.keys(obj).reduce((acc: any, key: any) => {
        const _acc = acc;
        if (obj[key] !== undefined) _acc[key] = obj[key];
        return _acc;
    }, {})
}
export default new class database {

    constructor() {

    }

    async insertOne(collection: string, array: {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).insertOne(array);
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

    async findOne(collection: string, query = {}, options = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).findOne(removeUndefined(query), options);
            return result
        } finally {
            await client.close();
        }
    }

    async findAll(collection: string, query = {}, options = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).find(removeUndefined(query), options).toArray()
            return result
        } finally {
            await client.close();
        }
    }

    async updateOne(collection: string, query = {}, update: {}, options = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).updateOne(removeUndefined(query), update, options)
            return result
        } finally {
            await client.close();
        }
    }

    async updateMany(collection: string, query = {}, update: {}, options = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).updateMany(removeUndefined(query), update, options)
            return result
        } finally {
            await client.close();
        }
    }

    async replaceOne(collection: string, query = {}, replacement: {}, options = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).replaceOne(removeUndefined(query), replacement, options)
            return result
        } finally {
            await client.close();
        }
    }

    async deleteOne(collection: string, query = {}, options = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).deleteOne(removeUndefined(query), options)
            return result
        } finally {
            await client.close();
        }
    }

    async deleteMany(collection: string, query = {}, options = {}) {
        try {
            await client.connect()
            const result = await db.collection(collection).deleteMany(removeUndefined(query), options)
            return result
        } finally {
            await client.close();
        }
    }
}
