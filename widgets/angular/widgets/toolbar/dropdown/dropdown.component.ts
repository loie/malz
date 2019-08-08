import { Component, Input, Output, EventEmitter, forwardRef, ContentChildren, AfterContentInit, OnInit, QueryList, ChangeDetectorRef } from '@angular/core';
import { ToolbarDropdownItemComponent } from "./item.component";
import { Subscription } from "rxjs";
import { SafeStyle } from "@angular/platform-browser";


@Component({
    selector: 'tm-toolbar-dropdown',
    templateUrl: 'app/widgets/toolbar/dropdown/dropdown.component.html',
    styleUrls: [
        'app/widgets/toolbar/dropdown/dropdown.component.css',
    ]
})

export class ToolbarDropdownComponent implements AfterContentInit, OnInit {
    MarkerType = MarkerType
    private isOpen: boolean
    private initialUp: boolean
    private initialRight: boolean
    private subscriptions: Subscription[]
    private hasHiddenMenu: boolean

    @ContentChildren(ToolbarDropdownItemComponent) dropdownItems: QueryList<ToolbarDropdownItemComponent>;

    @Input() icon?: string | undefined = undefined
    @Input() label?: string | undefined = undefined
    @Input() color?: SafeStyle | undefined = undefined
    @Input() markerType?: MarkerType = MarkerType.Circle
    @Input() right?: boolean = false
    @Input() up?: boolean = false
    @Input() disabled?: boolean = false
    @Input() loading?: boolean = false

    constructor(private cdr: ChangeDetectorRef) {
        this.subscriptions = []
        this.initialUp = false
        this.initialRight = false
        this.isOpen = false
        this.hasHiddenMenu = true
    }

    ngOnInit() {
        this.initialUp = this.up;
        this.initialRight = this.right;
    }

    ngAfterContentInit() {
        const handleDropdownItems = (newItems: QueryList<ToolbarDropdownItemComponent>) => {
            this.subscriptions.forEach(sub => {
                sub.unsubscribe();
            });
            this.subscriptions = [];
            newItems.forEach(item => {
                const subscription = item.select.subscribe((_: ValueEvent) => {
                    this.closeDropdown()
                });
                this.subscriptions.push(subscription);
            })
        };

        handleDropdownItems(this.dropdownItems);
        this.dropdownItems.changes.subscribe(handleDropdownItems);
    }

    private openDropdown(target?: HTMLElement | undefined): void {
        if (!this.disabled) {
            this.isOpen = true;
        }

        const getComponentRoot = (element: HTMLElement): HTMLElement => {
            return element.classList.contains("has-dropdown") || element.nodeName === "body" ?
                element : getComponentRoot(element.parentElement);
        }


        setTimeout(() => {
            const parentElement = getComponentRoot(target);

            const triggerRect = parentElement.firstElementChild.getBoundingClientRect()
            const menuRect = parentElement.querySelector(".toolbar-dropdown").getBoundingClientRect()
            const bodyRect = document.querySelector("body").getBoundingClientRect()

            if (this.initialUp) {
                this.up = menuRect.top > bodyRect.top
            } else {
                this.up = menuRect.bottom > bodyRect.bottom
            }

            if (this.initialRight) {
                this.right = menuRect.left > bodyRect.left
            } else {
                this.right = menuRect.right > bodyRect.right
                
            }
            this.hasHiddenMenu = false

            this.cdr.detectChanges()
        }, 0)
    }

    public closeDropdown(_?: HTMLElement | undefined): void {
        this.isOpen = false
        this.up = this.initialUp
        this.right = this.initialRight
        this.hasHiddenMenu = true
    }
}