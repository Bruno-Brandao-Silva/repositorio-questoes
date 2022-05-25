import { NextApiRequest, NextApiResponse } from "next";
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;

const url = "mongodb+srv://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@rq.dd17a.mongodb.net"
const database = 'image'
const imgBucket = 'imgBucket'

const mongoClient = new MongoClient(url);

export default async function download(request: NextApiRequest, response: NextApiResponse) {
    const name = request.query.name.toString()

    try {
        await mongoClient.connect();
        const databaseClient = mongoClient.db(database);
        const bucket = new GridFSBucket(databaseClient, {
            bucketName: imgBucket,
        });
        const downloadStream = bucket.openDownloadStreamByName(name)
        return new Promise(() => {
            downloadStream.on("data", function (data: any) {
                response.status(200).write(data);
            });

            downloadStream.on("error", function (err: any) {
                response.status(404).send({ message: "Cannot download the Image!" });
            });

            downloadStream.on("end", () => {
                mongoClient.close();
                response.end();
            });
        })

    } catch (error: any) {
        mongoClient.close();
        response.status(500).send({
            message: error.message,
        });
    }
};
