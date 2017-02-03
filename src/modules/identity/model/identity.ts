
const logMongoError = (error: Error) => {
    (<IGlobal>global).loggerUtil().error(`Mongo: ${error.message}`)
}

export const identityCollectionValidation = () => {
    try {
        (<IGlobal>global).db.createCollection('identities', {
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
    } catch (err) {
        logMongoError(err)
    }
}

export const createIdentity = (data: IIdentity) => (
    new Promise((resolve: Function, reject: Function) => {
        const identityCollection = (<IGlobal>global).db.collection('identities')

        const createIdentityData: any = Object.assign({}, data)
        createIdentityData.email = createIdentityData.email.toLowerCase()
        createIdentityData.createdAt = Date.now()

        identityCollection.insertOne(createIdentityData, (err: Error, doc: any) => {
            if (err) {
                logMongoError(err)
                reject({ errorMessage: err.message })
            }

            const query = {
                email: createIdentityData.email
            }

            identityCollection.find(query).limit(1).toArray((error: Error, result: any) => {
                if (error) {
                    reject({ errorMessage: err.message })
                }

                resolve(result[0])
            })
        })
    })
)

export const findIdentiyByEmail = (email: string) => (
    new Promise((resolve: Function, reject: Function) => {
        const query = {
            email: email.toLowerCase()
        }
        const identityCollection = (<IGlobal>global).db.collection('identities')

        identityCollection.find(query).limit(1).toArray((err: Error, result: any) => {
            if (err) {
                logMongoError(err)
                reject({ errorMessage: err.message })
            }

            if (result.length === 0) {
                reject((<IGlobal>global).errorUtil('NotFound'))
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
        const identityCollection = (<IGlobal>global).db.collection('identities')

        identityCollection.deleteOne(query, (err: Error) => {
            if (err) {
                logMongoError(err)
                reject(err)
            }

            resolve(identityId)
        })
    })
)
