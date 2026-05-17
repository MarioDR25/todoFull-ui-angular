import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type()"
      class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      [disabled]="disabled()"
    >
      <ng-content />
    </button>
  `,
  styles: [],
})
export class ButtonComponent {
  type = input<string>('button');
  disabled = input(false);
}
