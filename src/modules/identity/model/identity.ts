let db: any

export const identityCollectionValidation = () => {
    db = (<IGlobal>global).db

    try {
        db.createCollection('identities', {
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
        (<IGlobal>global).loggerUtil().error(`Identity create collection ${err}`)
    }
}

export const createIdentity = (data: IIdentity) => (
    new Promise((resolve: Function, reject: Function) => {
        const identityCollection = db.collection('identities')

        const createIdentityData: any = Object.assign({}, data)
        createIdentityData.email = createIdentityData.email.toLowerCase()
        createIdentityData.createdAt = Date.now()

        identityCollection.insertOne(createIdentityData, (err: Error, doc: any) => {
            if (err) {
                reject(err)
            }

            const query = {
                email: createIdentityData.email
            }

            identityCollection.find(query).limit(1).toArray((error: Error, result: any) => {
                if (error) {
                    reject(err)
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
        const identityCollection = db.collection('identities')

        identityCollection.find(query).limit(1).toArray((err: Error, result: any) => {
            if (err) {
                reject(err)
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
        resolve(identityId)
        // const query = {
        //     _id: identityId
        // }

        // identitySchema.remove(query, (err: Error) => {
        //     if (err) {
        //         reject(err)
        //     }

        //     resolve(identityId)
        // })
    })
)
