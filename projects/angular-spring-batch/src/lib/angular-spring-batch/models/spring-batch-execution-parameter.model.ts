import { Expose } from 'class-transformer';
import * as dayjs from 'dayjs';

export class SpringBatchExecutionParameter {

  private _inputValue?: string | null;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  value: any;

  @Expose()
  defaultValue: string;

  get inputValue(): any {
    return this._inputValue;
  }

  set inputValue(value: any) {

    switch (this.type) {
      case 'DATE':
        const m = value ? dayjs(value, 'DD/MM/YYYY HH:mm:ss', true) : dayjs();
        this.value = m.isValid() ? m.format('YYYY-MM-DDTHH:mm:ss') : null;
        this._inputValue = this.value;
        break;
      case 'DOUBLE':
        const double = value ? parseFloat(value) : 0;
        this.value = isNaN(double) ? null : double.toString();
        this._inputValue = this.value;
        break;
      case 'LONG':
        const long = value ? parseInt(value, 10) : 0;
        this.value = isNaN(long) ? null : long.toString();
        this._inputValue = this.value;
        break;
      case 'BOOLEAN':
        this.value = (value && (value === true || value === "true" || value === "1")) ;
        this._inputValue = this.value;
        break;
      case 'STRING':
        this.value = value;
        this._inputValue = this.value;
        break;
      default:
        this._inputValue = value;
        break;
    }
  }

  get invalid(): boolean {
    return this.inputValue && this.value === null;
  }

  get valid(): boolean {
    return !this.invalid;
  }

  constructor(name: string, type: string, defaultValue: string) {
    this.name = name;
    this.type = type;
    this.defaultValue = defaultValue;
    this.inputValue = defaultValue;
  }

}
