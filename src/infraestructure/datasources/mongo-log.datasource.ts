import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        try {
            const newLog = await LogModel.create(log)
            await newLog.save()
            console.log('Mongo Log created:', newLog.id)
        } catch (error) {
            
            throw new Error("Algo salio mal.");
        }

    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        try {
            const logs = await LogModel.find({
                level: severityLevel
            })
            return logs.map( mongoLog => LogEntity.fromObject(mongoLog))
        } catch (error) {
            
            throw new Error("Algo salio mal.");
        }

    }

}