import { Component, ContentChildren, AfterContentInit, QueryList, Input } from '@angular/core';

@Component({
	selector: 'tm-toolbar',
	templateUrl: "app/widgets/toolbar/toolbar.component.html",
	styleUrls: ["app/widgets/toolbar/toolbar.component.css"],
	host: {
		"[style.width]": "stretch && !vertical ? '100%' : null",
		"[style.height]": "stretch && vertical ? '100%' : null"
    }
})

export class ToolbarComponent {
	@Input() dark: boolean = false;
	@Input() light: boolean = false;
	@Input() hasShadow?: boolean = true;
	@Input() vertical?: boolean = false;
	@Input() reverse?: boolean = false;
	@Input() oneitem?: boolean = false;
	@Input() stretch?: boolean = false;
	@Input() small?: boolean = false;
}