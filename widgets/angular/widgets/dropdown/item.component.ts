import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SafeStyle } from "@angular/platform-browser";

@Component({
    selector: 'tm-dropdown-item',
    templateUrl: 'app/widgets/dropdown/item.component.html',
    styleUrls: ['app/widgets/dropdown/item.component.css']
})

export class DropdownItemComponent {
    MarkerType = MarkerType;

    @Input() label?: string | undefined = undefined;
    @Input() color?: SafeStyle | undefined = undefined;
    @Input() markerType?: MarkerType | undefined = MarkerType.Circle;
    @Input() icon?: string | undefined = undefined
    @Input() image?: string | undefined = undefined
    @Input() target?: string | undefined = undefined;
    @Input() openinnew?: boolean | undefined = undefined;
    @Input() disabled: boolean = false;
    @Input() active: boolean = false;
    @Input() value: any = undefined;
    
    @Output() select: EventEmitter<ValueEvent> = new EventEmitter<ValueEvent>();

    private fireValue(event: MouseEvent): void {
        const valueEvent: ValueEvent = {
            value: this.value,
            originalEvent: event
        };
        this.select.emit(valueEvent);
    }
 
    ngAfterContentInit() {
        // contentChildren are set
    }
}