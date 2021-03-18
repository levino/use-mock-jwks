import { assert } from 'chai'
import {createApp} from "./index";
import createJWKSMock from "mock-jwks";
import request from 'supertest'

describe('Test API auth', () => {
    test('Api auth', async () => {
        const jwksMock = createJWKSMock('https://example.org/')
        const app = createApp({
            jwksUri: 'https://example.org/.well-known/jwks.json'
        })

        const accessToken = jwksMock.token({
            aud: 'private',
            iss: 'master',
        })

        jwksMock.start()
        const response = await request(app).get('/').set('Authorization', `Bearer ${accessToken}`)
        assert.equal(response.status,  200)
        await jwksMock.stop()
    })
})