import database from "./database";
const collection = 'Account'
import { ObjectId } from 'mongodb'

export default class Account {

    _id?: ObjectId
    name?: string
    username?: string
    password?: string
    accountType?: string
    profileImage?: string

    constructor(_id?: ObjectId, name?: string, username?: string, password?: string,
        accountType?: string, profileImage?: string) {
        this._id = _id
        this.name = name
        this.username = username
        this.password = password
        this.accountType = accountType
        this.profileImage = profileImage
    }

    async insertOne(account = this) {
        return await database.insertOne(collection, account)
    }

    async insertMany(accounts: []) {
        return await database.insertMany(collection, accounts)
    }

    async findOne(account = this) {
        return await database.findOne(collection, account).then((result) => {
            if (result) return new Account(result.id, result.name, result.username, result.password, result.accountType, result.profileImage)
        })
    }

    async findAll() {
        return await database.findAll(collection).then((result) => {
            if (result) {
                let _result: Account[] = []
                result.forEach(element => {
                    _result.push(new Account(element.id, element.name, element.username, element.password, element.accountType, element.profileImage))
                });
                return _result;
            }
        })
    }

    async updateOne(Account = this, newAccount: Account) {
        return await database.updateOne(collection, Account, newAccount)
    }

    async updateMany(Account = this, newAccount: Account) {
        return await database.updateMany(collection, Account, newAccount)
    }

    async deleteOne(Account = this) {
        return await database.deleteOne(collection, Account)
    }

    async deleteMany(Account = this) {
        return await database.deleteMany(collection, Account)
    }
}

