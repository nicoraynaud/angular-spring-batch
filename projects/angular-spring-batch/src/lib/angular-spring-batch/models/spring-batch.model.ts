import { Expose, Transform, Type } from 'class-transformer';
import { SpringBatchExecutionParameter } from './spring-batch-execution-parameter.model';
import { SpringBatchExecutionStatus } from './spring-batch-execution-status.model';

export class SpringBatch {

  @Expose()
  description: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => SpringBatchExecutionParameter)
  parameters: SpringBatchExecutionParameter[] = [];

  @Expose()
  @Transform((value) => SpringBatchExecutionStatus.valueOf(value) || SpringBatchExecutionStatus.UNKNOWN)
  lastExecutionStatus: SpringBatchExecutionStatus;

}
