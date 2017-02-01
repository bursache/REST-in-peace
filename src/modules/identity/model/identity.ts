import * as mongoose from 'mongoose'

const Schema = mongoose.Schema
const definedIdentitySchema = new Schema(
    {
        profile: {
            name: {
                first: { type: String },
                last: { type: String }
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        password: { type: String, required: true },
        createdAt: { type: Number, default: Date.now() }
    }, {
        collection: 'users'
    }
)

let identitySchema: any

try {
    identitySchema = mongoose.model('users')
} catch (err) {
    identitySchema = mongoose.model('users', definedIdentitySchema)
}

export const createIdentity = (data: IIdentity) => {
    const newIdentity = new identitySchema(data)

    return newIdentity.save()
}

export const deleteIdentity = (userId: string) => (
    new Promise((resolve: Function, reject: Function) => {
        const query = {
            _id: userId
        }

        identitySchema.remove(query, (err: Error) => {
            if (err) {
                reject(err)
            }

            resolve(userId)
        })
    })
)
