import { ObjectId } from "mongodb";
import database from "./database";

const collection = 'Profile'

export default class Profile {
    _id?: ObjectId;
    email?: string;
    name?: string;
    role?: string//'Professor' | 'Aluno' | 'Administrador';

    constructor(_id?: ObjectId, email?: string,
        name?: string, role?: string) {
        this._id = _id;
        this.email = email
        this.name = name;
        this.role = role;
    }

    insertOne(profile = this) {
        return database.insertOne(collection, profile)
    }

    insertMany(profiles: []) {
        return database.insertMany(collection, profiles)
    }

    async findOne(profile = this) {
        return await database.findOne(collection, profile).then((result) => {
            if (result) return new Profile(result._id, result.email, result.name, result.role)
        })
    }

    async findAll() {
        return await database.findAll(collection).then((result) => {
            if (result) {
                let _result: any = []
                result.forEach(element => {
                    _result.push(new Profile(element._id, element.email, element.name, element.role))
                });
                return _result;
            }
        })
    }

    async updateOne(newProfile: Profile) {
        return await database.updateOne(collection, this, newProfile)
    }

    async updateMany(profile = this, newProfile: Profile) {
        return await database.updateMany(collection, profile, newProfile)
    }

    async replaceOne(newProfile: Profile) {
        return await database.replaceOne(collection, this, newProfile)
    }

    async deleteOne(profile = this) {
        return await database.deleteOne(collection, profile)
    }

    async deleteMany(profile = this) {
        return await database.deleteMany(collection, profile)
    }
}
