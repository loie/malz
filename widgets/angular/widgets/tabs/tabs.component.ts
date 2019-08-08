import { Component, Input, Output, OnInit, EventEmitter, forwardRef, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TabItemComponent } from "./item.component";
import { BehaviorSubject, Subscription } from "rxjs";


@Component({
    selector: 'tm-tabs',
    templateUrl: 'app/widgets/tabs/tabs.component.html',
    styleUrls: [
        'app/widgets/tabs/tabs.component.css',
        'app/widgets/field.component.css'
    ]
})

export class TabsComponent implements OnInit {
    private subscriptions: Subscription[];

    @ContentChildren(TabItemComponent) tabItems: QueryList<TabItemComponent>;

    @Input() fullwidth: boolean = false;
    @Input() loading: boolean = false;

    constructor() {
        this.subscriptions = [];
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
    }

    private selectTab(tabItem: TabItemComponent) {
        this.tabItems.forEach(item => {
            item.active = (item === tabItem);
        });
    }
}