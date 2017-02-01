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
        collection: 'identities'
    }
)

let identitySchema: any

try {
    identitySchema = mongoose.model('identities')
} catch (err) {
    identitySchema = mongoose.model('identities', definedIdentitySchema)
}

export const createIdentity = (data: IIdentity) => {
    const newIdentity = new identitySchema(data)

    return newIdentity.save()
}

export const findIdentiyByEmail = (email: string) => (
    new Promise((resolve: Function, reject: Function) => {
        const query = {
            email: email
        }

        identitySchema.find(query).limit(1).exec((err: Error, result: any) => {
            if (err) {
                return reject(err)
            }

            if (result.length === 0) {
                return reject((<IGlobal>global).errorUtil('NotFound'))
            }

            resolve(result[0])
        })
    })
)

export const deleteIdentity = (identityId: string) => (
    new Promise((resolve: Function, reject: Function) => {
        const query = {
            _id: identityId
        }

        identitySchema.remove(query, (err: Error) => {
            if (err) {
                reject(err)
            }

            resolve(identityId)
        })
    })
)
