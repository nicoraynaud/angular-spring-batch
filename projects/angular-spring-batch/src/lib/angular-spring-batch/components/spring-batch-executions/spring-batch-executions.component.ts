import { DOCUMENT } from '@angular/common';
import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SpringBatchExecutionFilters } from '../../models/spring-batch-execution-filters.model';
import { SpringBatchExecution } from '../../models/spring-batch-execution.model';
import { SpringBatch } from '../../models/spring-batch.model';
import { SpringBatchService } from '../../services/spring-batch.service';
import { SpringBatchExecutionDetailsModalComponent } from '../spring-batch-execution-details-modal/spring-batch-execution-details-modal.component';

@Component({
  selector: 'spring-batch-executions',
  styleUrls: ['./spring-batch-executions.component.scss'],
  templateUrl: './spring-batch-executions.component.html',
})
export class SpringBatchExecutionsComponent implements OnInit {

  private _job!: SpringBatch;
  private readonly maxPages = 11;

  executionDetailsModalComponentRef?: ComponentRef<SpringBatchExecutionDetailsModalComponent>;

  @ViewChild('executionDetailsModalViewRef', { read: ViewContainerRef })
  executionDetailsModalViewRef?: ViewContainerRef;

  executions: SpringBatchExecution[] = [];
  filters = new SpringBatchExecutionFilters();
  loadError = false;
  loading = false;
  page = 0;

  @Output()
  stop = new EventEmitter<SpringBatchExecution>();

  totalPages = 0;
  totalItems = 0;
  queryCount = 0;
  visible = true;

  get job() {
    return this._job;
  }

  @Input()
  set job(job: SpringBatch) {
    this._job = job;
    this.refresh();
  }

  get pages() {
    const count = Math.min(this.totalPages, this.maxPages);
    const first = Math.min(
      Math.max(0, this.page - Math.floor(this.maxPages / 2)),
      Math.max(0, this.totalPages - this.maxPages)
    );
    return Array(count).fill(null).map((x, index) => first + index);
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver, @Inject(DOCUMENT) private document: any, private jobsService: SpringBatchService) {
  }

  loadExecutions(page = 0) {
    this.executions = [];
    this.loadError = false;
    this.loading = true;
    this.page = page;
    this.jobsService.findAllJobExecutions(this.job, this.filters, page).pipe(
      catchError((error) => {
        this.loadError = true;
        return throwError(error);
      }),
      finalize(() => this.loading = false),
    ).subscribe((result) => {
      this.executions = result.items;
      this.page = result.page;
      this.totalPages = result.totalPages;
      this.totalItems = result.totalItems;
      this.queryCount = result.queryCount;
    });
  }

  ngOnInit() {
    this.refresh();
  }

  onClickExecutionDetails(execution: any) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(SpringBatchExecutionDetailsModalComponent);
    this.executionDetailsModalComponentRef = this.executionDetailsModalViewRef!.createComponent(factory);
    this.executionDetailsModalComponentRef.instance.close = () => this.executionDetailsModalComponentRef!.destroy();
    this.executionDetailsModalComponentRef.instance.execution = execution;
  }

  onClickPagination(event: any, page: any) {
    event.preventDefault();
    this.loadExecutions(page);
  }

  onClickStopButton(execution: SpringBatchExecution) {
    this.jobsService.stop(execution).subscribe(() => {
      this.refresh(execution);
      this.stop.emit(execution);
    });
  }

  onFiltersChange(filters: SpringBatchExecutionFilters) {
    this.filters = filters;
    this.loadExecutions();
  }

  refresh(execution?: SpringBatchExecution) {
    if (!this.job) {
      return;
    }
    if (execution) {
      this.jobsService.findJobExecution(execution.id).subscribe((item) => {
        const index = this.executions.indexOf(execution);
        if (index >= 0) {
          this.executions[index] = item;
        }
      });
    } else {
      this.loadExecutions();
    }
  }

  toggle() {
    this.visible = !this.visible;
  }

}
