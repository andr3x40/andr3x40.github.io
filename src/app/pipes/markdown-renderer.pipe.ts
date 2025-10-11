import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.use({
  extensions: [
    {
      name: 'heading',
      renderer({ tokens, depth }: any) {
        const text = this.parser.parseInline(tokens);
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

        switch (depth) {
          case 1: return `
                <h1 class="text-3xl font-black">
                  ${text}
                </h1>`;
          case 2: return `
                <h2 class="text-2xl font-bold">
                  ${text}
                </h2>`;
          case 3: return `
                <h3 class="text-xl font-bold">
                  ${text}
                </h3>`;
          case 4:
          case 5:
          case 6: return `
                <h${depth} class="text-lg font-bold">
                  ${text}
                </h${depth}>`;
          default: return `
                <p class="text-lg font-bold">
                  ${text}
                </p>`;
        }
      },
    },
    {
      name: 'paragraph',
      renderer({ tokens }: any) {
        const text = this.parser.parseInline(tokens);
        return `
                <p>
                  ${text}
                </p>`;
      },
    },
  ]
})

/**
 * The {@code MarkdownRenderer} pipe enables a text to be rendered in Markdown using `marked`.
 */
@Pipe({
  name: 'markdownRenderer'
})
export class MarkdownRendererPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(markdownText: string | null | undefined): SafeHtml {
    // if there's nothing, return nothing
    if (!markdownText) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }
    // else, parse the text to HTML, using GitHub Flavoured Markdown
    const html = marked.parse(markdownText, { gfm: true }) as string;
    // then, sanitize it
    const sanitizedHTML = DOMPurify().sanitize(html);
    // tell Angular it's okay to display this
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedHTML);
  }

}
