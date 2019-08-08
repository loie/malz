import { Component, AfterViewInit, Inject, ElementRef, HostBinding } from "@angular/core"
import { ContextMenuItemComponent, ContextMenuDescription } from "app/widgets/contextmenu/item.component"
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { MatDialogRef, MAT_DIALOG_DATA, DialogPosition} from '@angular/material';

@Component({
	selector: "tm-contextmenu",
	templateUrl: "app/widgets/contextmenu/contextmenu.component.html",
	styleUrls: ["app/widgets/contextmenu/contextmenu.component.css"],
	host: {
		class: "dropdown-menu"
	}
})

export class ContextMenuComponent implements AfterViewInit {

	private items: ContextMenuDescription[] | undefined
	private pos: Position

	constructor(public ref: MatDialogRef<ContextMenuComponent>,
			private sanitizer: DomSanitizer,
			private el: ElementRef, 
			@Inject(MAT_DIALOG_DATA) data: any) {
		if (data) {
			this.items = data
		}
	}

	ngAfterViewInit() {
		this.ref.afterOpened().subscribe(() => {

			window.requestAnimationFrame(() => {
				const boundingBox = (this.el.nativeElement as HTMLElement).parentElement.getBoundingClientRect()
				const moveUp = boundingBox.bottom > window.innerHeight
				const moveLeft = boundingBox.right > window.innerWidth
				const top = boundingBox.top
				const left = boundingBox.left


				let pos: DialogPosition = { "top": top.toString(10), "left": left.toString(10)}
				if (moveUp) {
					pos.top = (top - (boundingBox.bottom - window.innerHeight)).toString(10) + "px"
				}
				if (moveLeft) {
					pos.left = (left - (boundingBox.right - window.innerWidth)).toString(10) + "px"
				}

				if (moveUp || moveLeft) {
					this.ref.updatePosition(pos)
				}
			})

			window.requestAnimationFrame(() => {
				document.querySelector(".contextMenuBackdrop").addEventListener(
					"contextmenu",
					() => {
						event.preventDefault()
						const contextMenuEvent: MouseEvent = event as MouseEvent
						const reopenEvent: ValueEvent = {
							value: {
								x: contextMenuEvent.pageX,
								y: contextMenuEvent.pageY
							},
							originalEvent: contextMenuEvent
						}
						
						this.ref.close(reopenEvent)
					})
				})
		})
	}

	private closeDialog(item?: ContextMenuDescription | undefined) {
		this.ref.close(item)
	}
}