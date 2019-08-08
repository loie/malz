import { filter, throttleTime } from 'rxjs/operators';
import { Component, Input, Output, OnInit, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextInputComponent } from "./text.component";


@Component({
    selector: 'tm-textarea',
    templateUrl: 'app/widgets/input/textarea.component.html',
    styleUrls: [
        'app/widgets/input/text.component.css',
        'app/widgets/field.component.css'
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextareaInputComponent),
        multi: true,
    }]
})

export class TextareaInputComponent extends TextInputComponent {
    
}