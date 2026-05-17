import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-gray-100 py-4 text-center text-sm text-gray-500">
      TodoFull &copy; {{ year }}
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
