import { LogEntity } from '../../../../../src/domain/entities/log.entity'
import { CheckServiceMultiple } from '../../../../../src/domain/use-cases/checks/check-service-multiple'

describe('CheckService use case', () => {

    const mockRespository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mock2Respository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckServiceMultiple(
        [mockRespository,mock2Respository],
        successCallback,
        errorCallback
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })

    const callLogsSpy = jest.spyOn(CheckServiceMultiple.prototype as any, 'callLogs')


    test('should call successCallback when fetch returns true', async() => {
        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(callLogsSpy).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRespository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mock2Respository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('should call errorCallback when fetch returns false', async() => {
        const wasOk = await checkService.execute('https://googl3333333e.com')

        expect(wasOk).toBeFalsy()
        expect(successCallback).not.toHaveBeenCalled()
        expect(callLogsSpy).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRespository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mock2Respository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
})