import database from "./database";
const collection = 'Discipline'

export default class Discipline {
    id: string;
    name: string;
    description: string;
    length: string;

    constructor(id: any = undefined, name: any = undefined, description: any = undefined, length: any = undefined) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.length = length;
    }

    insertOne(discipline = this) {
        return database.insertOne(collection, discipline)
    }

    insertMany(disciplines: []) {
        return database.insertMany(collection, disciplines)
    }

    async findOne(discipline = this) {
        return await database.findOne(collection, discipline).then((result) => {
            if (result) return new Discipline(result.id, result.name, result.description, result.length)
        })
    }

    async findAll() {
        return await database.findAll(collection).then((result) => {
            if (result) {
                let _result: any = []
                result.forEach(element => {
                    _result.push(new Discipline(element.id, element.name, element.description, element.length))
                });
                return _result;
            }
        })
    }

    updateOne(discipline = this, newDiscipline: Discipline) {
        return database.updateOne(collection, discipline, newDiscipline)
    }

    updateMany(discipline = this, newDiscipline: Discipline) {
        return database.updateMany(collection, discipline, newDiscipline)
    }

    deleteOne(discipline = this) {
        return database.deleteOne(collection, discipline)
    }

    deleteMany(discipline = this) {
        return database.deleteMany(collection, discipline)
    }
}

