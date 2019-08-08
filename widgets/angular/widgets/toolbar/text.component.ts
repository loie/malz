import { Component } from "@angular/core";

@Component ({
	selector: "tm-toolbar-text",
	template: "<ng-content></ng-content>",
	styles: [`
		:host {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-left: 1rem;
			padding-right: 1rem;
		}

		:host :host-context(.is-dark) {
			color: var(--color-light);
		}

	`]
})

export class ToolbarTextComponent {}