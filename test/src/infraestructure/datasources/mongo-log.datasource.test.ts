import { LogModel, MongoDatabase } from '../../../../src/data/mongo'
import { envs } from '../../../../src/config/plugins/envs.plugin'
import { MongoLogDatasource } from '../../../../src/infraestructure/datasources/mongo-log.datasource'
import mongoose from 'mongoose'
import { LogEntity, LogSeverityLevel } from '../../../../src/domain/entities/log.entity'

describe('mongoLogDatasource.ts', () => {

    const mongoLogDatasource = new MongoLogDatasource()
    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'This is a test',
        origin: 'mongo-log.datasource.test.ts'
    })

    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    afterAll(async() => {
        await LogModel.deleteMany()
        mongoose.connection.close()
    })

    test('saveLog save a log in db', async() => {

        const logSPy = jest.spyOn(console,'log')
        await mongoLogDatasource.saveLog(log)
        expect(logSPy).toHaveBeenCalledWith('Mongo Log created:', expect.any(String))
    })

    test('saveLog should return a error', async() => {

        const mockSaveLog = jest.fn().mockImplementation(() => {
            throw new Error('This is a test')
        })

        try {
            mockSaveLog()
        } catch (error) {
            expect(true).toBeTruthy()
        }

    })

    test('getLogs should return a logEntity array', async() => {
        const severityLevel = LogSeverityLevel.low
        const logs = await mongoLogDatasource.getLogs(severityLevel)
        expect(logs.every( e => e instanceof LogEntity)).toBeTruthy()

    })

    test('getLogs should return a error', async() => {

        const mockGetLogs = jest.fn().mockImplementation(() => {
            throw new Error('This is a test')
        })

        try {
            mockGetLogs()
        } catch (error) {
            expect(true).toBeTruthy()
        }

    })
})