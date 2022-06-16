import { ObjectId } from "mongodb";
import database from "./database";

const collection = 'Question'

export default class Question {
    _id?: ObjectId;
    discipline?: ObjectId;
    title?: string;
    description?: string;
    question?: string;
    resolution?: string;
    answers?: string;
    imageFilesNameQuestion?: string[];
    imageFilesNameResolution?: string[];

    constructor(_id?: ObjectId, discipline?: ObjectId, title?: string,
        description?: string, question?: string, resolution?: string,
        answers?: string, imageFilesNameQuestion?: string[], imageFilesNameResolution?: string[]) {
        this._id = _id;
        this.discipline = discipline;
        this.title = title;
        this.description = description;
        this.question = question;
        this.resolution = resolution;
        this.answers = answers;
        this.imageFilesNameQuestion = imageFilesNameQuestion;
        this.imageFilesNameResolution = imageFilesNameResolution;
    }

    insertOne(question = this) {
        return database.insertOne(collection, question)
    }

    insertMany(questions: []) {
        return database.insertMany(collection, questions)
    }

    async findOne(question = this) {
        return await database.findOne(collection, question).then((result) => {
            if (result) return new Question(result._id, result.discipline, result.title, result.description, result.question, result.resolution, result.answers, result.imageFilesNameQuestion, result.imageFilesResolution)
        })
    }

    async findAll() {
        return await database.findAll(collection).then((result) => {
            if (result) {
                let _result: any = []
                result.forEach(element => {
                    _result.push(new Question(element._id, element.discipline, element.title, element.description, element.question, element.resolution, element.answers, element.imageFilesNameQuestion, element.imageFilesNameResolution))
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
