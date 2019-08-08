import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { SafeStyle } from "@angular/platform-browser";


@Component({
    selector: 'tm-button',
    templateUrl: 'app/widgets/button.component.html',
    styleUrls: ['app/widgets/button.component.css'],
})
export class ButtonComponent {
    private UIButtonContext = UIButtonContext;
    private MarkerType = MarkerType;

    @HostBinding('attr.data-disabled') @Input() disabled?: boolean = false;

    @Input() label: string = ""
    @Input() target?: string | undefined = undefined
    @Input() openinnew: boolean = false
	@Input() icon?: string | undefined = undefined
	@Input() image?: UrlString | undefined = undefined
    @Input() color?: SafeStyle | undefined = undefined
    @Input() markerType?: MarkerType | undefined = MarkerType.Circle
	@Input() loading: boolean = false
    @Input() small: boolean = false
    @Input() leftbound: boolean = false
    @Input() fullwidth: boolean = false
    @Input() active: boolean = false
    @Input() context: UIButtonContext = UIButtonContext.Default
    @Output() click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

    constructor() { }
}