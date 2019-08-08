import { filter } from 'rxjs/operators';
import { Component, Input, Output, EventEmitter, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { NavlistDropdownItemComponent } from "./item.component";
import { BehaviorSubject, Subscription } from "rxjs";


@Component({
    selector: 'tm-navlist-dropdown',
    templateUrl: 'app/widgets/navlist/dropdown/dropdown.component.html',
    styleUrls: [
        'app/widgets/navlist/dropdown/dropdown.component.css',
        'app/widgets/field.component.css'
    ],
})

export class NavlistDropdownComponent {
    UIButtonContext = UIButtonContext;
    private isOpen: boolean;
    private subscriptions: Subscription[];
    // private selectedButton: RadioButtonComponent = undefined;

    @ContentChildren(NavlistDropdownItemComponent) dropdownItems: QueryList<NavlistDropdownItemComponent>;

    @Input() context: UIButtonContext | undefined = UIButtonContext.Default;
    @Input() label? : string | undefined = "";
    @Input() icon?: string | undefined = undefined;
    @Input() right: boolean = false;
    @Input() disabled: boolean = false;
    @Input() loading: boolean = false;

    constructor() {
        this.subscriptions = [];
    }
    
    ngAfterContentInit() {
        const handleDropdownItems = (newItems: QueryList<NavlistDropdownItemComponent>) => {
            this.subscriptions.forEach(sub => {
                sub.unsubscribe();
            });
            this.subscriptions = [];
            newItems.forEach(item => {
                console.log(item);
                const subscription = item.select.subscribe(() => {
                    this.isOpen = false;
                });
                this.subscriptions.push(subscription);
            })
        };

        handleDropdownItems(this.dropdownItems);
        this.dropdownItems.changes.subscribe(handleDropdownItems);
    }

    private openDropdown(event: MouseEvent): void {
        event.stopPropagation();
        this.isOpen = true;
    }

    private closeDropdown(event: MouseEvent): void {
        event.stopPropagation();
        this.isOpen = false;
    }
}