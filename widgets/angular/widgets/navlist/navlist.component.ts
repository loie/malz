import { Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'tm-navlist',
    templateUrl: 'app/widgets/navlist/navlist.component.html',
    styleUrls: [
        'app/widgets/navlist/navlist.component.css'
    ],
})

export class NavlistComponent {
    @Output() change: EventEmitter<ValueEvent>;

    constructor() {
        this.change = new EventEmitter<ValueEvent>();
    }
}