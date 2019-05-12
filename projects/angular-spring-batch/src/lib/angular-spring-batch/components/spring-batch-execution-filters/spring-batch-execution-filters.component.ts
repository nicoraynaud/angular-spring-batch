import { Component, EventEmitter, Input, Output } from '@angular/core';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { moment } from '../../misc/spring-batch-moment';
import { SpringBatchExecutionFilters } from '../../models/spring-batch-execution-filters.model';
import { SpringBatchExecutionStatus } from '../../models/spring-batch-execution-status.model';

@Component({
  selector: 'spring-batch-execution-filters',
  styleUrls: ['./spring-batch-execution-filters.component.scss'],
  templateUrl: './spring-batch-execution-filters.component.html',
})
export class SpringBatchExecutionFiltersComponent {

  private _filters: SpringBatchExecutionFilters;

  beginDateInputValue: string;

  readonly dateTextMask = {
    keepCharPositions: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
    pipe: createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM:SS'),
  };

  endDateInputValue: string;

  @Output()
  filtersChange = new EventEmitter<SpringBatchExecutionFilters>();

  statuses = SpringBatchExecutionStatus.values;

  get filters() {
    return this._filters;
  }

  @Input()
  set filters(value: SpringBatchExecutionFilters) {
    this._filters = value;
    this.beginDateInputValue = this.dateInputValue(this.filters.beginDate);
    this.endDateInputValue = this.dateInputValue(this.filters.endDate);
  }

  private dateInputValue(date: Date) {
    return date ? moment(date).format('DD/MM/YYYY HH:mm:ss') : null;
  }

  private parseDate(value: string) {
    const m = moment(value, 'DD/MM/YYYY HH:mm:ss', true);
    return m.isValid() ? m.toDate() : null;
  }

  onBeginDateChange(value: string) {
    const date = this.parseDate(value);
    if (date !== this.filters.beginDate) {
      this.filters.beginDate = date;
      this.filtersChange.emit(this.filters);
    }
  }

  onEndDateChange(value: string) {
    const date = this.parseDate(value);
    if (date !== this.filters.endDate) {
      this.filters.endDate = date;
      this.filtersChange.emit(this.filters);
    }
  }

  onStatusChange(status: SpringBatchExecutionStatus) {
    this.filters.status = status;
    this.filtersChange.emit(this.filters);
  }

}
