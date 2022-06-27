import { ObjectId } from 'mongodb';
import { Profile } from 'next-auth'
import database from "./database";

const collection = 'Account'

export default class Auth {

    private profile: (Profile & Record<string, unknown>) | null | undefined
    _id?: ObjectId;
    async signInProfile(profile: Profile & Record<string, unknown>) {
        const Account = await this.findOne(profile)
        if (profile.sub === Account?.sub) {
            await this.replaceOne(profile)

        } else {
            return await this.insertOne(profile)
        }
        return Account;
    }

    async setProfile(sub: string) {
        sub == undefined ? sub = "" : sub
        return this.profile = await this.findOne({ sub: sub })
    }

    async insertOne(profile: Profile & Record<string, unknown>) {
        return await database.insertOne(collection, profile)
    }

    async findOne(profile: Profile & Record<string, unknown>) {
        const sub = profile.sub
        return await database.findOne(collection, { sub: sub })
    }

    async findAll(profile: Profile & Record<string, unknown>) {
        const email = profile.email
        return await database.findAll(collection, { email: email })
    }

    async replaceOne(profile: Profile & Record<string, unknown>) {
        const email = profile.email
        const sub = profile.sub
        return await database.replaceOne(collection, { sub: sub, email: email }, profile)
    }
}