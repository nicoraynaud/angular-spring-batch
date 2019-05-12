import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextMaskModule } from 'angular2-text-mask';
import { SpringBatchDetailsComponent } from './components/spring-batch-details/spring-batch-details.component';
import { SpringBatchExecutionDetailsModalComponent } from './components/spring-batch-execution-details-modal/spring-batch-execution-details-modal.component';
import { SpringBatchExecutionFiltersComponent } from './components/spring-batch-execution-filters/spring-batch-execution-filters.component';
import { SpringBatchExecutionFormComponent } from './components/spring-batch-execution-form/spring-batch-execution-form.component';
import { SpringBatchExecutionStepComponent } from './components/spring-batch-execution-step/spring-batch-execution-step.component';
import { SpringBatchExecutionsComponent } from './components/spring-batch-executions/spring-batch-executions.component';
import { SpringBatchListComponent } from './components/spring-batch-list/spring-batch-list.component';
import { SpringBatchLoadingIndicatorMessageComponent } from './components/spring-batch-loading-indicator-message/spring-batch-loading-indicator-message.component';
import { SpringBatchComponent } from './components/spring-batch/spring-batch.component';
import './misc/spring-batch-icons';
import { SpringBatchDurationPipe } from './pipes/spring-batch-duration.pipe';
import { SpringBatchService } from './services/spring-batch.service';

@NgModule({
  declarations: [
    SpringBatchDetailsComponent,
    SpringBatchExecutionDetailsModalComponent,
    SpringBatchExecutionFiltersComponent,
    SpringBatchExecutionFormComponent,
    SpringBatchExecutionsComponent,
    SpringBatchExecutionStepComponent,
    SpringBatchComponent,
    SpringBatchDurationPipe,
    SpringBatchListComponent,
    SpringBatchLoadingIndicatorMessageComponent,
  ],
  entryComponents: [
    SpringBatchExecutionDetailsModalComponent,
  ],
  exports: [
    SpringBatchComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    TextMaskModule,
  ],
  providers: [
    SpringBatchService,
  ],
})
export class SpringBatchModule {
}
