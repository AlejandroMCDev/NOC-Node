import { LogDatasource } from "../../../../src/domain/datasources/log.datasource";
import { LogRepositoryImpl } from "../../../../src/infraestructure/repositories/log.repository.impl";
import { LogEntity, LogSeverityLevel } from "../../../../src/domain/entities/log.entity";


describe('LogRepositoryImpl', () => {

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'This is a test',
        origin: 'log.datasource.test.ts'
    })

    const logRepositoryImpl = new LogRepositoryImpl(mockLogDataSource)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('saveLog should call the datasource with arguments', () => {
        logRepositoryImpl.saveLog(newLog)
        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(newLog)
    })

    test('getLogs should call the datasource with arguments', () => {
        const severityLevel = LogSeverityLevel.high
        logRepositoryImpl.getLogs(severityLevel)
        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(severityLevel)
    })
})