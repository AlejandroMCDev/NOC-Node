import { LogEntity } from '../../../../../src/domain/entities/log.entity'
import { CheckService } from '../../../../../src/domain/use-cases/checks/check-service'

describe('CheckService use case', () => {

    const mockRespository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckService(
        mockRespository,
        successCallback,
        errorCallback
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })


    test('should call successCallback when fetch returns true', async() => {
        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRespository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('should call errorCallback when fetch returns false', async() => {
        const wasOk = await checkService.execute('https://googl3333333e.com')

        expect(wasOk).toBeFalsy()
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRespository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
})