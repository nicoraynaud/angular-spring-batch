import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'springBatchDuration',
})
export class SpringBatchDurationPipe implements PipeTransform {

  private formatNumber(value: number) {
    const string = value.toString();
    return `${string.length < 2 ? '0' : ''}${string}`;
  }

  transform(seconds: number | null | undefined) {
    if (seconds === null || seconds === undefined) {
      return null;
    }

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds - (h*3600)) / 60);
    const s = Math.floor(seconds % 60);
    return `${this.formatNumber(h)}:${this.formatNumber(m)}:${this.formatNumber(s)}`;
  }

}
