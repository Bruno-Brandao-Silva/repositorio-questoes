import { Profile } from 'next-auth';
import database from "./database";

const collection = 'Perfil' 

export default class Auth {

    private profile: (Profile & Record<string, unknown>) | null | undefined

    async signInProfile(profile: Profile & Record<string, unknown>) {
        const response = await this.findOne(profile)
        if (profile.sub === response?.sub) {
            await this.replaceOne(profile)
        } else {
            await this.insertOne(profile)
        }
    }

    async setProfile(sub: string) {
        return this.profile = await this.findOne({ sub: sub })
    }

    async insertOne(profile: Profile & Record<string, unknown>) {
        await database.insertOne(collection, profile)
    }

    async findOne(profile: Profile & Record<string, unknown>) {
        const sub = profile.sub
        return database.findOne(collection, { sub: sub })
    }

    async findAll(profile: Profile & Record<string, unknown>) {
        const email = profile.email
        return database.findAll(collection, { email: email })
    }

    async replaceOne(profile: Profile & Record<string, unknown>) {
        const email = profile.email
        const sub = profile.sub
        await database.replaceOne(collection, { sub: sub, email: email }, profile)
    }
}