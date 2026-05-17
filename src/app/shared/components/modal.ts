import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        (click)="close.emit()"
      >
        <div
          class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          (click)="$event.stopPropagation()"
        >
          <ng-content />
        </div>
      </div>
    }
  `,
  styles: [],
})
export class ModalComponent {
  isOpen = input(false);
  close = output();
}
