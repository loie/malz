import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit } from "@angular/core"
import { MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser"

export interface ContextMenuDescription {
	label: string
	tooltip?: string | undefined
	icon?: string | undefined
	target?: string | undefined
	action?: Function | undefined
	items?: ContextMenuDescription[] | undefined
}

interface Position {
	x: number
	y: number
}

@Component({
	selector: "tm-contextmenu-item",
	templateUrl: "app/widgets/contextmenu/item.component.html",
	styleUrls: [
		"app/widgets/dropdown/item.component.css",
		"app/widgets/contextmenu/item.component.css"
	]
})

export class ContextMenuItemComponent implements AfterViewInit {
	@Input() label: string
	@Input() tooltip: string | undefined
	@Input() icon: string | undefined
	@Input() target: UrlString | undefined
	@Input() action: Function | undefined
	@Input() items: ContextMenuDescription[] | undefined
	@Input() dialogRef: MatDialogRef<any>

	@Output() itemClicked: EventEmitter<MouseEvent>

	private transformStyle: SafeStyle
	private submenuPos: Position

	constructor(
			private sanitizer: DomSanitizer,
			private el: ElementRef) {
		this.itemClicked = new EventEmitter<MouseEvent>()
	}

	ngOnInit() {
		this.submenuPos = {
			x: 0,
			y: 0
		}
	}

	ngAfterViewInit() {
		if (this.items && this.items.length > 0) {
			this.dialogRef.afterOpened().subscribe(() => {
				window.setTimeout(() => {
					const entry = this.el.nativeElement as HTMLElement
					const entryRect = entry.getBoundingClientRect()
					const submenuRect = entry.querySelector(".submenu").getBoundingClientRect()
					
					const hasRightOverlap = (submenuRect.right - window.innerWidth) > 0
					
					const x = hasRightOverlap ? -1 * submenuRect.width : entryRect.width
					const bottomOverlapPx = submenuRect.bottom - window.innerHeight
					const y = -1 * (bottomOverlapPx < 0 ? entryRect.height : bottomOverlapPx + (2 * entryRect.height))

					this.submenuPos = {
						x: x,
						y: y
					}
				}, 200)
			})
		}
	}

	private fireEvent(event: MouseEvent) {
		if (this.action) {
			this.action()
			this.itemClicked.emit(event)
		}
	}

	private get submenuPosition(): SafeStyle {
		const value = `translateX(${this.submenuPos.x}px) translateY(${this.submenuPos.y}px)`
		return this.sanitizer.bypassSecurityTrustStyle(value)
	}
}