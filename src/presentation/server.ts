import { CronService } from './cron/cron-service'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl'
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasource'
import { EmailService } from './email/email.service'
import { envs } from '../config/plugins/envs.plugin'
import { SendEmailLogs } from '../domain/use-cases/email/send-logs'
import { MongoLogDatasource } from '../infraestructure/datasources/mongo-log.datasource'
import { PostgresLogDatasource } from '../infraestructure/datasources/postgres-log.datasource'


const logRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const sendEmailWithFileSystemLogs = new EmailService().sendEmailWithFileSystemLogs

export class Server {
    
    static start(){
        console.log('Server started...')

        /* new SendEmailLogs(
            sendEmailWithFileSystemLogs,
            fileSystemLogRepository
        ).execute('alejandromcdev@gmail.com') */

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    logRepository,
                    () => console.log('success'),
                    ( error ) => console.log(error) 
                ).execute('https://google.com')
            }
        )
    }


}