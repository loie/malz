import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SafeStyle } from "@angular/platform-browser";

@Component({
    selector: 'tm-tab-item',
    templateUrl: 'app/widgets/tabs/item.component.html'
})

export class TabItemComponent {
    @Input() title: string = "Tab";
    @Input() color?: SafeStyle | undefined = undefined;
    @Input() icon?: string | undefined = undefined;
    
    @Input() disabled: boolean = false;
    @Input() active: boolean = false;
    
    
    @Output() select: EventEmitter<ValueEvent> = new EventEmitter<ValueEvent>();

}