import { ObjectId } from "mongodb";
import database from "./database";

const collection = 'Question'

export default class Question {
    _id?: ObjectId;
    title?: string;
    description?: string;
    content?: any[];
    imageFilesName?: string[];

    constructor(_id?: ObjectId, title?: string,
        description?: string, content?: any[], imageFilesName?: string[]) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.imageFilesName = imageFilesName;
    }

    insertOne(question = this) {
        return database.insertOne(collection, question)
    }

    insertMany(questions: []) {
        return database.insertMany(collection, questions)
    }

    async findOne(question = this) {
        return await database.findOne(collection, question).then((result) => {
            if (result) return new Question(result._id, result.title, result.description, result.content, result.imageFilesName)
        })
    }

    async findAll() {
        return await database.findAll(collection).then((result) => {
            if (result) {
                let _result: any = []
                result.forEach(element => {
                    _result.push(new Question(element._id, element.title, element.description, element.content, element.imageFilesName))
                });
                return _result;
            }
        })
    }

    async updateOne(question = this, newQuestion: Question) {
        return await database.updateOne(collection, question, newQuestion)
    }

    async updateMany(question = this, newQuestion: Question) {
        return await database.updateMany(collection, question, newQuestion)
    }

    async deleteOne(question = this) {
        return await database.deleteOne(collection, question)
    }

    async deleteMany(question = this) {
        return await database.deleteMany(collection, question)
    }
}
