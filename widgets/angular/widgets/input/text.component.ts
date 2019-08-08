import { filter, throttleTime } from 'rxjs/operators';
import { Component, Input, Output, OnInit, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from "rxjs";


@Component({
    selector: 'tm-text',
    templateUrl: 'app/widgets/input/text.component.html',
    styleUrls: [
        'app/widgets/input/text.component.css',
        'app/widgets/field.component.css'
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextInputComponent),
        multi: true,
    }]
})

export class TextInputComponent implements ControlValueAccessor, OnInit {
    UIContext = UIContext;
    private _value: BehaviorSubject<string>;
    private valueLabel: string = undefined;
    private actualShowHelp: boolean = false;
    private regex: RegExp = undefined;

    @Input() context: UIContext | undefined = UIContext.Default;
    @Input() label?: string | undefined = undefined;
    @Input() icon?: string | undefined = undefined
    @Input() type?: string = "text"
	@Input() placeholder: string = "Please enter Text";
    @Input() help?: string = "";
    @Input() showHelp? : boolean | undefined = undefined;
	@Input() autocomplete: string = "on";
    @Input() disabled: boolean = false;
    @Input() small: boolean = false;
    @Input() validation?: string | undefined = undefined
    @Input() initValue? : string = "";
    @Input() step? : string | undefined = undefined
    @Input() required?: boolean = false;


    @Input() set value (value: string) {
        this.valueLabel = value;
    }
    get value(): string {
        return this.valueLabel;
    }

    @Output() change: EventEmitter<ValueEvent>
    @Output() keyup: EventEmitter<ValueEvent>
    @Output() validationChanged: EventEmitter<ValueEvent>

    constructor() {
        this._value = new BehaviorSubject<any>(undefined)
        this.change = new EventEmitter<ValueEvent>()
        this.keyup = new EventEmitter<ValueEvent>()
        this.validationChanged = new EventEmitter<ValueEvent>()
    }

    ngOnInit() {
        this._value.subscribe(value => {
            this.valueLabel = value;
        });

        if (this.validation) {
            this.regex = new RegExp("^" + this.validation + "$");
        }

    }

    private checkAndUpdate(event: Event) {
        const value: string = (<HTMLInputElement>event.target).value;
        this._value.next(value);
        if (value === undefined) {

        }
        this.change.emit({ "originalEvent": event, "value": value});
        this.keyup.emit({ "originalEvent": event, "value": value});
        this.propagateChange(value);
        if (this.regex && !this.regex.test(value)) {
            this.context = UIContext.Danger;
            
            if (this.showHelp === undefined) {
                this.actualShowHelp = true;
            }

            this.validationChanged.emit({
                value: false,
                originalEvent: undefined
            })
        } else if (this.showHelp === undefined) {
            this.context = UIContext.Default
            this.actualShowHelp = false
            this.validationChanged.emit({
                value: true,
                originalEvent: undefined
            })
        }
    }

    private onInput(event: Event) { 
        event.stopPropagation();
        this.checkAndUpdate(event);
    }

    private onKeyUp(event: KeyboardEvent) {
        event.stopPropagation();
        this.checkAndUpdate(event);
    }

    private onChange(event: Event) {
        event.stopPropagation();
        this.checkAndUpdate(event);
    }


    writeValue(value: any): void {
        this._value.next(value);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any): void { }

    private propagateChange = (_: any) => { };
}