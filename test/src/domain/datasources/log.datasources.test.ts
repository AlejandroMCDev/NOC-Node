import { LogDatasource } from '../../../../src/domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../../../src/domain/entities/log.entity'

describe('log.datasource.ts', () => {

    const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'This is a test',
        origin: 'log.datasource.test.ts'
    })

    class MockLogDataSource implements LogDatasource {

        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test('should test the abstract class', async() => {
        const mockLogDataSource = new MockLogDataSource()
        expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource)
        expect(mockLogDataSource).toHaveProperty('saveLog')
        expect(mockLogDataSource).toHaveProperty('getLogs')

        await mockLogDataSource.saveLog(newLog)
    })
})