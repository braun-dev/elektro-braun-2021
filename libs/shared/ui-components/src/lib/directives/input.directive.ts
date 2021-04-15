import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ebInput]',
})
export class InputDirective {
  @HostBinding('class') classes = `
    appearance-none
    flex flex-shrink-0 flex-grow-0
    bg-white border border-gray-300
    rounded-md shadow-sm
    pl-3 pr-4 py-2 text-left
    cursor-default
    focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm
  `;
}
