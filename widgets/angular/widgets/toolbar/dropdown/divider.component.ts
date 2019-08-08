import { Component } from '@angular/core';

@Component({
	selector: 'tm-toolbar-dropdown-divider',

	template: `<hr class="toolbar-dropdown-divider">`,
	styles: [`
    .toolbar-dropdown-divider {
        display: block;
        border: none;
        border-bottom: 0.05rem solid var(--color-medium-light);
        height: 0;
        margin: 0.5rem 0;
    }`],
})

export class ToolbarDropdownDividerComponent { }