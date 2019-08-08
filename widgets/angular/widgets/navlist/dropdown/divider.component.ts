import { Component } from '@angular/core';

@Component({
	selector: 'tm-navlist-dropdown-divider',
	template: `<hr class="dropdown-divider" />`,
	styles: [`
    .dropdown-divider {
    	background-color: #dbdbdb;
    	border: none;
    	display: block;
    	height: 1px;
    	margin: 0.5rem 0;
	}`],
})

export class NavlistDropdownDividerComponent { }