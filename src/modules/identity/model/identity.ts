import * as mongoose from 'mongoose'

const validateEmail = (email: string) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
}

const Schema = mongoose.Schema
const definedIdentitySchema = new Schema(
    {
        profile: {
            name: {
                first: { type: String, required: true },
                last: { type: String, required: true }
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: { type: String, required: true },
        createdAt: { type: Number, default: Date.now() }
    }, {
        collection: 'users'
    }
)

const identitySchema = mongoose.model('users', definedIdentitySchema)

export const createIdentity = (companyData: any ) => {
    const newIdentity = new identitySchema(companyData)

    return newIdentity.save()
}
