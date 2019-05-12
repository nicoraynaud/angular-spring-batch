import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'spring-batch-loading-indicator-message',
  styleUrls: ['./spring-batch-loading-indicator-message.component.scss'],
  templateUrl: './spring-batch-loading-indicator-message.component.html',
})
export class SpringBatchLoadingIndicatorMessageComponent {

  @Input()
  loadError = false;

  @Input()
  loadErrorMessage = 'Erreur lors du chargement !';

  @Input()
  loading = false;

  @Input()
  loadingMessage = 'Chargement en cours...';

  @HostBinding('hidden')
  get hidden() {
    return !this.loading && !this.loadError;
  }

}
