const db = (<IGlobal>global).db

db.createCollection("identities", {
    validator: {
        $and: [
            { 'email': { $type: 'string', $exists: true } },
            { 'password': { $type: 'string', $exists: true } },
            { 'createdAt': { $type: 'number', $exists: true } },
        ]
    },
    validationAction: 'error',
    validationLevel: 'moderate'
})

export const createIdentity = (data: IIdentity) => {
    const newIdentity = new identitySchema(data)

    return newIdentity.save()
}

export const findIdentiyByEmail = (email: string) => (
    new Promise((resolve: Function, reject: Function) => {
        const query = {
            email: email.toLowerCase()
        }

        identitySchema.find(query).exec((err: Error, result: any) => {
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
