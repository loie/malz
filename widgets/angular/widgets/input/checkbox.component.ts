import { filter } from 'rxjs/operators';
import { Component, Input, Output, OnInit, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from "rxjs";


@Component({
    selector: 'tm-checkbox',
    templateUrl: 'app/widgets/input/checkbox.component.html',
    styleUrls: [
        'app/widgets/input/checkbox.component.css',
        'app/widgets/field.component.css'
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true,
    }]
})

export class CheckboxComponent implements ControlValueAccessor, OnInit {
    UIContext = UIContext;
    // source of truth
    private value: BehaviorSubject<boolean>;
    private _checked: boolean | undefined;

    @Input() label?: string | undefined = undefined;
    @Input() disabled: boolean = false;
    @Input() set checked(value: boolean | undefined) {
        if (this._checked !== value) {
            this.value.next(value ? true : false);
        }
    }

    get checked(): boolean | undefined {
        return this._checked;
    }

    @Output() change: EventEmitter<ValueEvent>;

    constructor() {
        this.value = new BehaviorSubject<any>(undefined);
        this.change = new EventEmitter<ValueEvent>();
    }

    ngOnInit() {
        this.value.subscribe(value => {
            this._checked = value ? true : undefined;
        });
    }

    private onChange(event: Event) {
        event.stopPropagation();
        const value = (<HTMLInputElement>event.target).checked
        this.value.next(value);
        this.change.emit({ "originalEvent": event, "value": value});
        this.propagateChange(value);
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