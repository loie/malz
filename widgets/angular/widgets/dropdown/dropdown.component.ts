import { filter } from 'rxjs/operators';
import { Component, Input, Output, OnInit, EventEmitter, forwardRef, ContentChildren, AfterContentInit, QueryList, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownItemComponent } from "./item.component";
import { SafeStyle } from "@angular/platform-browser";
import { BehaviorSubject, Subscription } from "rxjs";


@Component({
    selector: 'tm-dropdown',
    templateUrl: 'app/widgets/dropdown/dropdown.component.html',
    styleUrls: [
        'app/widgets/dropdown/dropdown.component.css',
        'app/widgets/field.component.css'
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownComponent),
        multi: true,
    }]
})

export class DropdownComponent implements ControlValueAccessor, OnInit, AfterContentInit {
    private UIButtonContext = UIButtonContext;
    private UIContext = UIContext;
    private MarkerType = MarkerType;
    private value: BehaviorSubject<any>;
    private valueLabel: string;
    private isOpen: boolean;
    private subscriptions: Subscription[];
    private actualShowHelp: boolean = false;

    private initialUp: boolean;
    private initialRight: boolean;


    private hasHiddenMenu: boolean;

    @ContentChildren(DropdownItemComponent) dropdownItems: QueryList<DropdownItemComponent>;

    @Input() context: UIButtonContext | undefined = UIButtonContext.Default
    @Input() initButtonLabel?: string = ""

    @Input() fieldicon?: string | undefined = undefined
    @Input() icon?: string | undefined = undefined
    @Input() image?: string | undefined = undefined
    @Input() label?: string | undefined = undefined
    @Input() color?: SafeStyle | undefined = undefined
    @Input() markerType?: MarkerType | undefined = MarkerType.Circle
    @Input() right: boolean = false
    @Input() up: boolean = false
    @Input() disabled: boolean = false
    @Input() small: boolean = false
    @Input() fullwidth: boolean = false
    @Input() loading: boolean = false
    @Input() showHelp? : boolean | undefined = undefined
    @Input() help?: string = ""

    @Input() set buttonLabel(value: string) {
        this.valueLabel = value;
    }
    get buttonLabel(): string {
        return this.valueLabel;
    }

    
    @Output() change: EventEmitter<ValueEvent>
    @Output() opened: EventEmitter<ValueEvent>
    @Output() closed: EventEmitter<ValueEvent>

    constructor(private changeDetector: ChangeDetectorRef) {
        this.value = new BehaviorSubject<any>(undefined);
        this.change = new EventEmitter<ValueEvent>()
        this.opened = new EventEmitter<ValueEvent>()
        this.closed = new EventEmitter<ValueEvent>()
        this.subscriptions = []
        this.initialUp = false
        this.initialRight = false
        this.hasHiddenMenu = true
    }

    ngOnInit() {
        this.valueLabel = this.initButtonLabel;
        this.initialUp = this.up;
        this.initialRight = this.right;
        this.value.subscribe(value => {            
            if (this.dropdownItems && this.dropdownItems.length > 0) {
                const dropdownItem = this.dropdownItems.find(item => value === item.value);
                if (dropdownItem) {
                    dropdownItem.active = true
                    this.valueLabel = dropdownItem.label
                    this.icon = dropdownItem.icon
                } else {
                    this.valueLabel = this.initButtonLabel
                    this.icon = undefined
                }
                const otherDropdowns = this.dropdownItems
                    .filter(item => value !== item.value)
                    .forEach(item => { item.active = false })
            }
        });
    }

    ngAfterContentInit() {
        const handleDropdownItems = (newItems: QueryList<DropdownItemComponent>) => {
            this.subscriptions.forEach(sub => {
                sub.unsubscribe();
            });
            this.subscriptions = [];
            newItems.forEach(item => {
                const subscription = item.select.subscribe((event: ValueEvent) => {
                    this.closeDropdown()
                    if (event.value !== undefined) {
                        this.valueLabel = item.label;
                        this.value.next(event.value);
                        this.change.emit(event);
                        this.onChange(event.value);
                    }
                });
                this.subscriptions.push(subscription);
            })
        };

        handleDropdownItems(this.dropdownItems);
        this.dropdownItems.changes.subscribe(handleDropdownItems);
    }

    writeValue(value: any): void {
        this.value.next(value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn
    }

    private onChange = (_: any) => {}
    private onTouch = () => {}

    private openDropdown(target: HTMLElement): void {
        
        if (!this.disabled) {
            this.isOpen = true

            this.opened.emit({
                value: undefined,
                originalEvent: undefined
            })
        }

        const getComponentRoot = (element: HTMLElement): HTMLElement => {
            return element === null || element === undefined || element.classList.contains("field") || element.nodeName === "body" ?
                element : getComponentRoot(element.parentElement);
        }

        if (target) {
            setTimeout(() => {
                const parentElement = getComponentRoot(target);
                if (parentElement) {
                    const menuRect = parentElement.querySelector(".dropdown-menu").getBoundingClientRect()
                    const bodyRect = document.querySelector("body").getBoundingClientRect()                    

                    if (this.initialUp) {
                        this.up = menuRect.top > bodyRect.top
                    } else {
                        this.up = menuRect.bottom > bodyRect.bottom
                    }

                    if(this.initialRight) {
                        this.right = menuRect.left > bodyRect.left
                    } else {
                        this.right = menuRect.right > bodyRect.right
                    }
                }
                this.hasHiddenMenu = false
                this.changeDetector.detectChanges()
            }, 0)
        }
    }
    private closeDropdown(): void {
        this.isOpen = false;
        this.hasHiddenMenu = true
        this.closed.emit({
            value: undefined,
            originalEvent: undefined
        })
        this.up = this.initialUp
        this.right = this.initialRight
    }
}