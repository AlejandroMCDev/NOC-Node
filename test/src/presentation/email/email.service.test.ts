import nodemailer from 'nodemailer'
import { EmailService,SendMailOptions } from '../../../../src/presentation/email/email.service'

describe('EmailService', () => {

    const mockSendMail = jest.fn()
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })

    const emailService = new EmailService()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should send email', async() => {
        
        const options:SendMailOptions = {
            to: 'alejandrowowody@gmail.com',
            htmlBody: "<h1>Test</h1>",
            subject: "Test",
        }

        await emailService.sendEmail(options)
        expect(mockSendMail).toHaveBeenCalledWith({
            to: 'alejandrowowody@gmail.com',
            html: "<h1>Test</h1>",
            subject: "Test",
            attachments: expect.any(Array)
        })
    })

    test('should send email with attachments', async() => {

        const options:SendMailOptions = {
            to: 'alejandrowowody@gmail.com',
            htmlBody: "<h1>Test</h1>",
            subject: "Test",
            attachments: [{
                filename: 'test.txt'
            }]
        }

        await emailService.sendEmail(options)
        expect(mockSendMail).toHaveBeenCalledWith({
            to: 'alejandrowowody@gmail.com',
            html: "<h1>Test</h1>",
            subject: "Test",
            attachments: expect.arrayContaining([
                { filename: 'test.txt' }
            ])
        })
    })

})