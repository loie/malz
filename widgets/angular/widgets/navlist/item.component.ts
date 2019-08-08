import { Component, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { NavlistDropdownItemComponent } from "./dropdown/item.component";
import { SafeStyle } from "@angular/platform-browser";

@Component({
    selector: 'tm-navlist-item',
    templateUrl: 'app/widgets/navlist/item.component.html',
    styleUrls: ['app/widgets/navlist/item.component.css']
})

export class NavlistItemComponent {
    private UIButtonContext = UIButtonContext;
    private MarkerType = MarkerType;

    private hasDropdownItems: boolean = false;

    @Input() label: string = "";
    @Input() icon: string | undefined = undefined;
    @Input() color?: SafeStyle | undefined = undefined;
    @Input() markerType?: MarkerType = MarkerType.Circle;
    @Input() target?: string | undefined = undefined;
    @Input() openinnew?: boolean | undefined = undefined;
    @Input() active?: boolean | undefined = undefined;
    
    @Output() select: EventEmitter<ValueEvent> = new EventEmitter<ValueEvent>();

    @ContentChildren(NavlistDropdownItemComponent) dropdownItems: QueryList<NavlistDropdownItemComponent>;
 
    ngAfterContentInit() {
        this.hasDropdownItems = this.dropdownItems.length > 0;
        this.dropdownItems.changes.subscribe(items => {
            this.hasDropdownItems = items.length > 0;
        });
    }

    // private fireValue(event: MouseEvent): void {
    //     const valueEvent: ValueEvent = {
    //         value: this.value,
    //         originalEvent: event
    //     };
    //     this.select.emit(valueEvent);
    // }
}