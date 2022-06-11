import { ObjectId } from "mongodb";
import database from "./database";

const collection = 'Discipline'

export default class Discipline {
    _id?: ObjectId;
    name?: string;
    description?: string;
    length?: string;
    imageFilesName?: string[];

    constructor(_id?: ObjectId, name?: string,
        description?: string, length?: string, imageFilesName?: string[]) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.length = length;
        this.imageFilesName = imageFilesName;
    }

    insertOne(discipline = this) {
        return database.insertOne(collection, discipline)
    }

    insertMany(disciplines: []) {
        return database.insertMany(collection, disciplines)
    }

    async findOne(discipline = this) {
        return await database.findOne(collection, discipline).then((result) => {
            if (result) return new Discipline(result._id, result.name, result.description, result.length, result.imageFilesName)
        })
    }

    async findAll() {
        return await database.findAll(collection).then((result) => {
            if (result) {
                let _result: any = []
                result.forEach(element => {
                    _result.push(new Discipline(element._id, element.name, element.description, element.length, element.imageFilesName))
                });
                return _result;
            }
        })
    }

    async updateOne(discipline = this, newDiscipline: Discipline) {
        return await database.updateOne(collection, discipline, newDiscipline)
    }

    async updateMany(discipline = this, newDiscipline: Discipline) {
        return await database.updateMany(collection, discipline, newDiscipline)
    }

    async deleteOne(discipline = this) {
        return await database.deleteOne(collection, discipline)
    }

    async deleteMany(discipline = this) {
        return await database.deleteMany(collection, discipline)
    }
}
