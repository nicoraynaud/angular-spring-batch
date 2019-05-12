import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { moment } from '../misc/spring-batch-moment';
import { SpringBatchExecutionFilters } from '../models/spring-batch-execution-filters.model';
import { SpringBatchExecutionStep } from '../models/spring-batch-execution-step.model';
import { SpringBatchExecution } from '../models/spring-batch-execution.model';
import { SpringBatch } from '../models/spring-batch.model';

@Injectable()
export class SpringBatchService {

  constructor(private httpClient: HttpClient) {
  }

  findAllJobExecutions(job: SpringBatch, filters: SpringBatchExecutionFilters, page = 0): Observable<{ items: SpringBatchExecution[], page: number, totalPages: number, totalItems: number, queryCount: number  }> {
    // Immutable since 5.0.0
    let params = new HttpParams();
    params = params.append('page', String(page))
    .append('size', String(5))
    .append('sort', 'createTime,desc');
    if (filters.beginDate) {
      params = params.append('executionBeginDate', moment(filters.beginDate).format('YYYY-MM-DDTHH:mm:ss'));
    }
    if (filters.endDate) {
      params = params.append('executionEndDate', moment(filters.endDate).format('YYYY-MM-DDTHH:mm:ss'));
    }
    if (filters.status) {
      params = params.append('status', filters.status.name);
    }
    return this.httpClient.get(`/management/jobs/${job.name}/executions`, { observe: 'response', params: params }).pipe(map((response: HttpResponse<SpringBatchExecution>) => {
      const json = response.body;
      return {
        items: plainToClass(SpringBatchExecution, json['content'], { strategy: 'excludeAll' }),
        page: json['number'],
        totalPages: json['totalPages'],
        totalItems: json['totalElements'],
        queryCount: json['numberOfElements']
      };
    }));
  }

  findAllJobExecutionSteps(execution: SpringBatchExecution): Observable<SpringBatchExecutionStep[]> {
    return this.httpClient.get(`/management/jobs/executions/${execution.id}/stepexecutions`).pipe(map((response: SpringBatchExecutionStep[]) => {
      return plainToClass(SpringBatchExecutionStep, response, { strategy: 'excludeAll' });
    }));
  }

  findAllJobs(req?: any): Observable<SpringBatch[]> {
    let options: HttpParams = new HttpParams();
    if (req) {
      options = options.set('jobName', req);
    }
    return this.httpClient.get('/management/jobs', { params: options}).pipe(map((response: SpringBatch[]) => {
      return plainToClass(SpringBatch, response, { strategy: 'excludeAll' }).sort((first, second) => {
        return first.name.toLowerCase().localeCompare(second.name.toLowerCase());
      });
    }));
  }

  findJob(name: string): Observable<SpringBatch> {
    return this.httpClient.get(`/management/jobs/${name}`).pipe(map((response) => {
      return plainToClass<SpringBatch, {}>(SpringBatch, response);
    }));
  }

  findJobExecution(id: number): Observable<SpringBatchExecution> {
    return this.httpClient.get(`/management/jobs/executions/${id}`).pipe(map((response) => {
      return plainToClass<SpringBatchExecution, {}>(SpringBatchExecution, response);
    }));
  }

  start(execution: SpringBatchExecution): Observable<SpringBatchExecution> {
    const data = execution.parameters.map((parameter) => ({
      name: parameter.name,
      value: parameter.value,
    }));
    return this.httpClient.post(`/management/jobs/${execution.jobName}/start`, data).pipe(map((response) => {
      return plainToClass<SpringBatchExecution, {}>(SpringBatchExecution, response);
    }));
  }

  stop(execution: SpringBatchExecution): Observable<boolean> {
    return this.httpClient.post(`/management/jobs/executions/${execution.id}/stop`, null).pipe(map((response) => {
      return true;
    }));
  }

}
