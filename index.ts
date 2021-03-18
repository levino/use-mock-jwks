import express, {ErrorRequestHandler} from 'express'
import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'

interface Config {
    jwksUri: string
}

export const createApp: (config: Config) => express.Application = ({jwksUri}) => {
    const app = express()
    app.use(
        jwt({
            secret: jwksRsa.expressJwtSecret({
                cache: false,
                jwksUri,
            }),
            audience: 'private',
            issuer: 'master',
            algorithms: ['RS256'],
        })
    )
    app.get('/', (_, res) => {
        res.sendStatus(200)
    })
    app.use((error,_, __,next): ErrorRequestHandler => {
        console.log(error)
        next(error)
    })
    return app
}