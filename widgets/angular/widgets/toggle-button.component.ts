import {Component, EventEmitter, Input, Output, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'tm-toggle-button',
    templateUrl: 'app/widgets/toggle-button.component.html',
    styleUrls: ['app/widgets/button.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ToggleButtonComponent),
        multi: true,
    }]
})

export class ToggleButtonComponent implements ControlValueAccessor {
    UIButtonContext = UIButtonContext;

    @Input() label: string = "";
    @Input() target: string | undefined = undefined;
    @Input() openinnew: boolean = false;
    @Input() icon: string | undefined = undefined;
    @Input() disabled: boolean = false;
    @Input() pressed?: boolean | undefined = undefined;
    @Input() loading: boolean = false;
    @Input() small: boolean = false;
    @Input() fullwidth: boolean = false;
    @Input() context: UIButtonContext = UIButtonContext.Default;
    @Output() toggle: EventEmitter<ToggleEvent> = new EventEmitter<ToggleEvent>();

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent): void {
        if (e.key === " ") {
            this.fireToggle(e);
            e.preventDefault();
        }
    }

    writeValue(obj: any): void {
        if (obj === null || obj === undefined) {
            this.pressed = false;
        } else if (typeof obj === "boolean") {
            this.pressed = obj;
        }
        else {
            throw new Error("only boolean values are allowed as ngModel on toggle button")
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any): void {}

    private propagateChange = (_: any) => { };

    private fireToggle(event: Event): void {
        this.pressed = !this.pressed;
        const toggleEvent: ToggleEvent = {
            isPressed: this.pressed,
            originalEvent: event
        };

        this.toggle.emit(toggleEvent);
        this.propagateChange(this.pressed);
    }
}