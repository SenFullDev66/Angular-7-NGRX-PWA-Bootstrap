export enum Severity {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger'
}

export interface Message {
  type: Severity;
  message: string;
}
