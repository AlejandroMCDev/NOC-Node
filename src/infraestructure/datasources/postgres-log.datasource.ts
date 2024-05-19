import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    try {
      const { level, ...rest } = log;

      await prisma.logModel.create({
        data: {
          ...rest,
          level: severityEnum[level],
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    try {
      const dbLogs = await prisma.logModel.findMany({
        where: { level },
      });
      return dbLogs.map((dbLog) => LogEntity.fromObject(dbLog));
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
