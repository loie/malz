import { Injectable, Injector, Component, TemplateRef, Inject, ApplicationRef, ComponentFactoryResolver, NgZone } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { DialogComponent } from "../dialog/dialog.component";
import { OverlayContainer } from "./overlay-container";
import { OverlayConfig } from "./overlay-config";
import { DomPortalOutlet } from "./domportaloutlet";
import { OverlayRef } from "./overlay-ref";
import { ComponentPortal } from "./portal";
import { Subject, BehaviorSubject } from "rxjs";
import { OverlayKeyboardDispatcher } from "./keyboard-dispatcher";

@Injectable()
export class Injection {

	private overlayRef: OverlayRef;
	private nextUniqueId: number = 0;
	private appRef: ApplicationRef;
	private _hasInjected: boolean;
	public onClosed: Subject<any>;
	public options: BehaviorSubject<any>;


	constructor(
		private _overlayContainer: OverlayContainer,
		@Inject(DOCUMENT) private _document: any,
		private injector: Injector,
		private componentFactoryResolver: ComponentFactoryResolver,
		private keyboardDispatcher: OverlayKeyboardDispatcher,
		private ngZone: NgZone) {
		this._hasInjected = false;
		this.onClosed = new Subject<any>();
		this.options = new BehaviorSubject<any>(undefined);
	}

	get hasInjected(): boolean {
		return this._hasInjected
	}



	public inject(dialogRef: any, options?: any) {
		this.overlayRef = this.create();
		const userProfilePortal = new ComponentPortal(dialogRef);
		this.overlayRef.attach(userProfilePortal);
		this._hasInjected = true;
		if (options) {
			this.options.next(options);
		}
	}

	private create(config?: OverlayConfig): OverlayRef {
		const host = this.createHostElement();
		const portalOutlet = this.createPortalOutlet(host);
		const overlayConfig = new OverlayConfig(config);

		return new OverlayRef(portalOutlet, host, overlayConfig, this.ngZone,
			this.keyboardDispatcher, this._document);
	}

	private createHostElement(): HTMLElement {
		const host = this._document.createElement('div');
		this._overlayContainer.getContainerElement().appendChild(host);
		return host;
	}

	// /**
	//    * Creates the DOM element for an overlay and appends it to the overlay container.
	//    * @returns Newly-created pane element
	//    */
	//    private createPaneElement(host: HTMLElement): HTMLElement {
	//     const pane = this._document.createElement('div');
	//     pane.id = `tm-overlay-${this.nextUniqueId++}`;
	//     pane.classList.add('tm-overlay-pane');
	//     host.appendChild(pane);

	//     return pane;
	// }

	/**
     * Create a DomPortalOutlet into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal outlet.
     * @returns A portal outlet for the given DOM element.
     */
	private createPortalOutlet(pane: HTMLElement): DomPortalOutlet {
		// We have to resolve the ApplicationRef later in order to allow people
		// to use overlay-based providers during app initialization.
		if (!this.appRef) {
			this.appRef = this.injector.get<ApplicationRef>(ApplicationRef);
		}

		return new DomPortalOutlet(pane, this.componentFactoryResolver, this.appRef, this.injector);
	}


	close(value?: any) {
		this.onClosed.next(value);
		this.overlayRef.dispose();
		this._hasInjected = false;
		this.options.next(undefined);
	}
}
