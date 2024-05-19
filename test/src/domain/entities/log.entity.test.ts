import { LogEntity, LogSeverityLevel } from '../../../../src/domain/entities/log.entity'

describe('LogEntity', () => {
    test('should create a LogEntity instance', () => {

        const dataObj = {
            level: LogSeverityLevel.low,
            message: 'This is a test',
            origin: 'log.entity.test.ts'
        }

        const log = new LogEntity(dataObj)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test('should create a logEntity instance from json', () => {

        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-05-10T22:02:55.490Z","origin":"check-service.ts"}`

        const logEntity = LogEntity.fromJson(json)
        expect(logEntity).toBeInstanceOf(LogEntity)

    })

    test('should create a logEntity instance from object', () => {

        const object = {message:"Service https://google.com working",level:"low",createdAt:"2024-05-10T22:02:55.490Z",origin:"check-service.ts"}

        const logEntity = LogEntity.fromObject(object)
        expect(logEntity).toBeInstanceOf(LogEntity)

    })

})