import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { Attachment } from 'nodemailer/lib/mailer'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { SendEmailLogs } from '../../domain/use-cases/email/send-logs'


export interface SendMailOptions {
    to: string | string[]
    subject: string
    htmlBody: string
    attachments?: Attachment[]
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        },
        tls: {
            rejectUnauthorized: false
        },
    })


    async sendEmail( options: SendMailOptions ):Promise<boolean>{

        const { htmlBody,subject,to,attachments = [] } = options

        try {

            const sentInformation = await this.transporter.sendMail({
                subject,
                to,
                html: htmlBody,
                attachments
            })

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ){
        const subject = 'Logs del servidor'
        const htmlBody = `
        <h3>Logs del sistema - NOC</h3>
        `

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: 'logs/logs-all.log' }
        ]

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })

    }

}