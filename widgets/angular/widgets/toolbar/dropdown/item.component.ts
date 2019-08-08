import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core"
import { SafeStyle } from "@angular/platform-browser";

@Component({
    selector: 'tm-toolbar-dropdown-item',
    templateUrl: 'app/widgets/toolbar/dropdown/item.component.html',
    styleUrls: ['app/widgets/toolbar/dropdown/item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        "[class.disabled]": "disabled"
    }
})

export class ToolbarDropdownItemComponent {
    private MarkerType = MarkerType;

    @Input() label?: string = ""
    @Input() color?: SafeStyle | undefined = undefined
    @Input() markerType?: MarkerType = MarkerType.Circle
    @Input() icon: string | undefined = undefined
    @Input() image: string | undefined = undefined
    @Input() target?: string | undefined = undefined
    @Input() openinnew?: boolean | undefined = undefined
    @Input() disabled: boolean = false
    @Input() active: boolean = false
    @Output() select: EventEmitter<Event> = new EventEmitter<Event>()

    constructor() {
    }

    private fireEvent(event: Event) {
        this.select.emit(event);
    }
}