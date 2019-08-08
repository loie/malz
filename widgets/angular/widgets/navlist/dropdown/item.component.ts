import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tm-navlist-dropdown-item',
    templateUrl: 'app/widgets/navlist/dropdown/item.component.html',
    styleUrls: ['app/widgets/navlist/dropdown/item.component.css']
})

export class NavlistDropdownItemComponent {

    @Input() label?: string | undefined = undefined;
    @Input() icon?: string | undefined = undefined;
    @Input() target?: string | undefined = undefined;
    @Input() openinnew?: boolean | undefined = undefined;
    @Input() disabled: boolean = false;
    @Input() active: boolean = false;
    
    @Output() select: EventEmitter<ValueEvent> = new EventEmitter<ValueEvent>();

    private fireValue(event: MouseEvent): void {
        const valueEvent: ValueEvent = {
            value: undefined,
            originalEvent: event
        };
        console.log("clicked");
        this.select.emit(valueEvent);
    }
}