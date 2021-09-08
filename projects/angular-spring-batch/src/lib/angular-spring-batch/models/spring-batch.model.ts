import { Expose, Transform, Type } from 'class-transformer';
import { SpringBatchExecutionParameter } from './spring-batch-execution-parameter.model';
import { SpringBatchExecutionStatus } from './spring-batch-execution-status.model';
import {TransformFnParams} from 'class-transformer/types/interfaces';

export class TransferType {
  static statusTransformer(value: TransformFnParams) {
    return SpringBatchExecutionStatus.valueOf(value.value) || SpringBatchExecutionStatus.UNKNOWN;
  }
}

// @dynamic
export class SpringBatch {

  @Expose()
  description: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => SpringBatchExecutionParameter)
  parameters: SpringBatchExecutionParameter[] = [];

  @Expose()
  @Transform(TransferType.statusTransformer)
  lastExecutionStatus: SpringBatchExecutionStatus;

}
