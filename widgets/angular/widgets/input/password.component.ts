import { filter } from 'rxjs/operators';
import { Component, Input, Output, OnInit, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from "rxjs";
import { TextInputComponent } from "./text.component";


@Component({
    selector: 'tm-password',
    templateUrl: 'app/widgets/input/password.component.html',
    styleUrls: [
        'app/widgets/input/text.component.css',
        'app/widgets/field.component.css'
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PasswordInputComponent),
        multi: true,
    }]
})

export class PasswordInputComponent extends TextInputComponent {
	@Input() autocomplete: string = "current-password";
}