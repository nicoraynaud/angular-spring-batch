// @dynamic
export class SpringBatchExecutionStatus {

  static readonly values: SpringBatchExecutionStatus[] = [];

  static readonly ABANDONED = new SpringBatchExecutionStatus('ABANDONED', 'Abandonné', 'secondary', 'stop-circle');
  static readonly COMPLETED = new SpringBatchExecutionStatus('COMPLETED', 'Terminé', 'success', 'check');
  static readonly FAILED = new SpringBatchExecutionStatus('FAILED', 'Erreur', 'danger', 'exclamation-triangle');
  static readonly STARTED = new SpringBatchExecutionStatus('STARTED', 'Démarré', 'primary', 'play-circle');
  static readonly STARTING = new SpringBatchExecutionStatus('STARTING', 'Démarrage', 'primary', 'play-circle');
  static readonly STOPPED = new SpringBatchExecutionStatus('STOPPED', 'Arrêté', 'secondary', 'stop-circle');
  static readonly STOPPING = new SpringBatchExecutionStatus('STOPPING', 'Arrêt', 'secondary', 'stop-circle');
  static readonly UNKNOWN = new SpringBatchExecutionStatus('UNKNOWN', 'Inconnu', 'warning', 'question');

  static valueOf(name: string) {
    return SpringBatchExecutionStatus.values.find(etat => etat.name === name);
  }

  private constructor(public readonly name: string, public label: string, public readonly color: string, public icon: string) {
    SpringBatchExecutionStatus.values.push(this);
  }

}
