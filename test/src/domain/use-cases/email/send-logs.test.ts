
import { LogEntity } from '../../../../../src/domain/entities/log.entity'
import { SendEmailLogs } from '../../../../../src/domain/use-cases/email/send-logs'

describe('sendLogs use case', () => {

    const mockLogRespository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockSendEmailWithFileSystemLogs = jest.fn().mockReturnValue(true)

    const sendLogs = new SendEmailLogs(
        mockSendEmailWithFileSystemLogs,
        mockLogRespository
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })


    test('should return true if fetch its ok', async() => {
        const wasOk = await sendLogs.execute('https://google.com')

        expect(wasOk).toBeTruthy()
        expect(mockLogRespository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('should return false if fetch is not ok', async() => {
        mockSendEmailWithFileSystemLogs.mockResolvedValue(false)
        const wasOk = await sendLogs.execute('https://googl3333333e.com')

        expect(wasOk).toBeFalsy()
        expect(mockLogRespository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

})