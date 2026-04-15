import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCut'
})
export class TextCutPipe implements PipeTransform {

  transform(text: string | undefined, lineCount: number = 0): string {
    let lines: string[] = text?.split('\n') ?? [];
    return lines.slice(0, lineCount).join('\n');
  }

}
