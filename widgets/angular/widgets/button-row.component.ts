import { Component, Input } from '@angular/core';
import { ButtonComponent } from "./button.component";
import { DropdownComponent } from "./dropdown/dropdown.component";

@Component({
    selector: 'tm-button-row',
    templateUrl: "app/widgets/button-row.component.html",
    styleUrls: [
        'app/widgets/field.component.css',
        'app/widgets/button-row.component.css'
    ],
})
export class ButtonRowComponent {
	@Input() reverse?: boolean = false
	@Input() grouped?: boolean = false

}