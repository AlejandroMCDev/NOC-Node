import { envs } from '../../../src/config/plugins/envs.plugin'

describe('envs.plugin.ts', () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'alejandrowowody@gmail.com',
            MAILER_SERVICE: 'gmail',
            MAILER_SECRET_KEY: '123123213',
            PROD: false,
            MONGO_URL: 'mongodb://alejandro:1234567@localhost:27017',       
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'alejandro',
            MONGO_PASS: '1234567'
          })
    })

    test('should return error if not found env', async() => {
        jest.resetModules()
        const envVariable = 'PORT'
        process.env[envVariable] = 'ABC'

        try {
            await import('../../../src/config/plugins/envs.plugin')
            expect(true).toBe(false)
        } catch (error) {
            expect(`${error}`).toContain(`"${envVariable}" should be a valid integer`)
        }

    })
})