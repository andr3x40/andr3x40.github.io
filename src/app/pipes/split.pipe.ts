import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(string: string | undefined, split: string): string[] {
    if (string === undefined) return [];
    return string.split(split);
  }

}
