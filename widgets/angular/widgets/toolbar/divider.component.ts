import { Component } from '@angular/core';

@Component({
	selector: 'tm-toolbar-divider',

	template: `<div class="toolbar-divider"></div>`,
	styles: [`
    :host {
        display: flex;
        align-items: center;
    }

    .toolbar-divider {
        display: flex;
        align-items: center;
        flex-grow: 0;
        flex-shrink: 0;
        width: 0.05rem;
        height: 2rem;
        padding: 0;
        top: 0.625rem;
        background-color: var(--color-medium);
    }`],
})

export class ToolbarDividerComponent { }