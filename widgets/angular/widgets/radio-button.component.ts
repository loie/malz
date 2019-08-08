import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SafeStyle } from "@angular/platform-browser";


@Component({
    selector: 'tm-radio-button',
    templateUrl: 'app/widgets/radio-button.component.html',
    styleUrls: [
        'app/widgets/button.component.css',
        'app/widgets/radio-button.component.css',
    ]
})

export class RadioButtonComponent {
    private UIButtonContext = UIButtonContext;
    private MarkerType = MarkerType;

    @Input() label: string = "";
    @Input() icon: string | undefined = undefined;
    @Input() disabled: boolean = false;
    @Input() pressed: boolean = false;
    @Input() value: any = undefined;
    @Input() small: boolean = false;
    @Input() color?: SafeStyle | undefined = undefined;
    @Input() markerType?: MarkerType | undefined = MarkerType.Circle;
    @Input() context: UIButtonContext = UIButtonContext.Default;
    @Output() change: EventEmitter<ValueEvent> = new EventEmitter<ValueEvent>();

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent): void {
        if (e.key === " ") {
            this.fireValue(e);
            e.preventDefault();
        }
    }

    private fireValue(event: Event): void {
        const valueEvent: ValueEvent = {
            value: this.value,
            originalEvent: event
        };

        this.change.emit(valueEvent);
    }
}