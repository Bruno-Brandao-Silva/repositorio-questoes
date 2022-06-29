import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import router from 'next/router';
import Auth from "../../../models/auth";

const auth = new Auth()

export default async function NextA(req: NextApiRequest, res: NextApiResponse) {
    return new Promise(async (resolve, reject) => {
        NextAuth(req, res, {

            providers: [
                Auth0Provider({
                    clientId: process.env.AUTH0_CLIENT_ID!,
                    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
                    issuer: process.env.AUTH0_ISSUER_BASE_URL!,
                })
            ],

            secret: process.env.AUTH0_SECRET,

            callbacks: {
                async signIn({ user, account, profile, email, credentials }) {
                    const response:any = await auth.signInProfile(profile)
                    user = { ...user, sub: user.email, _id: response!._id } as any
                    user.email = profile.sub // trocado para o sub<autenticador [google-oauth2, auth0]>
                    if (!profile.email_verified) {
                        return false
                    }
                    return true
                },
                async redirect({ url, baseUrl }) {
                    return baseUrl
                },
                async session({ session, user, token }: any) {
                    session.user = { ...session.user, _id: token._id } as any
                    return session
                },
                async jwt({ token, user, account, profile, isNewUser }) {
                    return token
                }
            },

            pages: {
                //signIn: '/auth/signin',
                //signOut: '/auth/signout',
                error: '/', // Error code passed in query string as ?error=
                //verifyRequest: '/auth/verify-request', // (used for check email message)
                newUser: '/profile' // New users will be directed here on first sign in (leave the property out if not of interest)
            },
        })
    })
}