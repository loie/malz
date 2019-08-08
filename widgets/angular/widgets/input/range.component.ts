import { Component, Input, Output, forwardRef, EventEmitter } from "@angular/core"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { BehaviorSubject, Observable, Subscription } from "rxjs";

@Component ({
	selector: "tm-range",
	templateUrl: "app/widgets/input/range.component.html",
	styleUrls: ["app/widgets/input/range.component.css"],
	providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RangeComponent),
        multi: true,
    }]
})
export class RangeComponent {

    private value: BehaviorSubject<number>;

	@Input() min: number
	@Input() max: number
	@Input() step: number

    @Input() preIcon: string | undefined
    @Input() preImage: string | undefined
    @Input() postIcon: string | undefined
    @Input() postImage: string | undefined

    @Output() update: EventEmitter<ValueEvent>
    @Output() input: EventEmitter<ValueEvent>

    constructor() {
        this.value = new BehaviorSubject<number>(NaN)
        this.update = new EventEmitter<ValueEvent>()
        this.input = new EventEmitter<ValueEvent>()
    }

	writeValue(obj: any): void {
        this.value.next(obj)
    }


    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn
    }
 
    private onChange = (_: any) => {}
    private onTouch = () => {}

    private inputValue(event: Event) {
        const value: number = (event.target as HTMLInputElement).valueAsNumber
        this.input.emit({
            "value": value,
            originalEvent: event
        })
    }

    private updateValue(event: Event) {
        const value: number = (event.target as HTMLInputElement).valueAsNumber
        this.writeValue(value)
        this.update.emit({
            "value": value,
            originalEvent: event
        })
    }
}