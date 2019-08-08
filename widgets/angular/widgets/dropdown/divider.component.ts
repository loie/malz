import { Component } from '@angular/core';

@Component({
	selector: 'tm-dropdown-divider',
	template: `<hr class="dropdown-divider" />`,
	styles: [`
    .dropdown-divider {
    	border: none;
        border-bottom: 0.05rem solid var(--color-medium);
    	display: block;
    	height: 0;
    	margin: 0.5rem 0;
	}`],
})

export class DropdownDividerComponent { }