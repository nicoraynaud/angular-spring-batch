import { Expose, Transform, Type } from 'class-transformer';
import { SpringBatchExecutionStatus } from './spring-batch-execution-status.model';

export class SpringBatchExecutionStep {

  @Expose()
  commitCount: number;

  @Expose()
  @Type(() => Date)
  endTime: Date;

  @Expose()
  exitCode: string;

  @Expose()
  exitMessage: string;

  @Expose()
  filterCount: number;

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  processSkipCount: number;

  @Expose()
  readCount: number;

  @Expose()
  readSkipCount: number;

  @Expose()
  rollbackCount: number;

  @Expose()
  @Type(() => Date)
  startTime: Date;

  @Expose()
  @Transform((name) => SpringBatchExecutionStatus.valueOf(name) || SpringBatchExecutionStatus.UNKNOWN)
  status: SpringBatchExecutionStatus;

  @Expose()
  writeCount: number;

  @Expose()
  writeSkipCount: number;

  get duration() {
    if (this.startTime && this.endTime) {
      return (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    }
    return null;
  }

  get logsUrl() {
    return `/management/jobs/stepexecutions/${this.id}/logs`;
  }

}
