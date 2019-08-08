import { filter } from 'rxjs/operators';
import { Component, Input, Output, EventEmitter, forwardRef, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from "./radio-button.component";
import { BehaviorSubject } from "rxjs";


@Component({
    selector: 'tm-radio-field',
    templateUrl: 'app/widgets/radio-field.component.html',
    styleUrls: [
        'app/widgets/button.component.css',
        'app/widgets/field.component.css',
        "app/widgets/radio-field.component.css"
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioFieldComponent),
        multi: true,
    }]
})

export class RadioFieldComponent implements ControlValueAccessor {
    UIButtonContext = UIButtonContext;

    private value: BehaviorSubject<any>;
    private selectedButton: RadioButtonComponent = undefined;

    @ContentChildren(RadioButtonComponent) radioButtons: QueryList<RadioButtonComponent>;

    @Input() disabled: boolean = false;
    @Input() small: boolean = false;
    @Input() fullwidth: boolean = false;
    @Input() label?: string | undefined = undefined;
    @Output() change: EventEmitter<ValueEvent>;

    constructor() {
        this.value = new BehaviorSubject<any>(undefined);
        this.change = new EventEmitter<ValueEvent>();
    }

    ngOnInit() {
        this.value.subscribe(value => {
            if (this.radioButtons && this.radioButtons.length > 0) {
                this.radioButtons.forEach(button => {
                    if (value === button.value) {
                        this.selectedButton = button;
                        button.pressed = true;
                    } else {
                        button.pressed = false;
                    }
                });
            }
        });
    }

    ngAfterContentInit() {
        this.radioButtons.forEach(button => {
            button.change.pipe(
                filter(event => {
                    return event.value !== this.value.getValue();
                }))
                .subscribe(event => {
                    this.value.next(event.value);
                    this.change.emit(event);
                    this.propagateChange(event.value);
                });
        })
    }


    writeValue(value: any): void {
        this.value.next(value);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any): void { }

    private propagateChange = (_: any) => { };
}