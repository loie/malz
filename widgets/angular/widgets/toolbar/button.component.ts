import { Component } from '@angular/core';
import { ButtonComponent } from "../button.component";

@Component({
	selector: 'tm-toolbar-button',
	templateUrl: 'app/widgets/button.component.html',
	styleUrls: [
		'app/widgets/button.component.css',
		'app/widgets/toolbar/button.component.css'
	]
})
export class ToolbarButtonComponent extends ButtonComponent { }