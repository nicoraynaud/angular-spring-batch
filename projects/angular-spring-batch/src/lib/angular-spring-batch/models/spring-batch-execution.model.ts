import { Expose, Transform, Type } from 'class-transformer';
import { SpringBatchExecutionParameter } from './spring-batch-execution-parameter.model';
import { SpringBatchExecutionStatus } from './spring-batch-execution-status.model';

export class SpringBatchExecution {

  @Expose()
  @Type(() => Date)
  createTime: Date;

  @Expose()
  @Type(() => Date)
  endTime: Date;

  @Expose()
  exitCode: string;

  @Expose()
  id: number;

  @Expose()
  jobName: string;

  @Expose()
  @Type(() => SpringBatchExecutionParameter)
  parameters: SpringBatchExecutionParameter[] = [];

  @Expose()
  @Type(() => Date)
  startTime: Date;

  @Expose()
  @Transform((name) => SpringBatchExecutionStatus.valueOf(name) || SpringBatchExecutionStatus.UNKNOWN)
  status: SpringBatchExecutionStatus;

  get duration() {
    if (this.startTime && this.endTime) {
      return (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    }
    return null;
  }

  get logsUrl() {
    return `/management/jobs/executions/${this.id}/logs`;
  }

  get stoppable() {
    return [SpringBatchExecutionStatus.STARTED, SpringBatchExecutionStatus.STARTING].indexOf(this.status) >= 0;
  }

}
