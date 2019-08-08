import { Injectable, Type, ViewContainerRef } from "@angular/core"
import { Overlay, OverlayConfig, ScrollStrategy, PositionStrategy, OverlayRef } from "@angular/cdk/overlay"
import { ComponentPortal } from "@angular/cdk/portal"
import { TMOverlayRef } from "./tm-overlayref";


interface TMOverlayConfig {
	panelClass?: string
	hasBackdrop?: boolean
	scrollStrategy: ScrollStrategy
	viewContainerRef?: ViewContainerRef
}


const DefaultOverlayConfig: TMOverlayConfig = {
	panelClass: "",
	hasBackdrop: false,
	scrollStrategy: undefined,
	viewContainerRef: undefined
}

@Injectable()
export class OverlayService {
	constructor(private overlay: Overlay) { }

	open(component: Type<any>, config: TMOverlayConfig): TMOverlayRef {

		const dialogConfig = { ...DefaultOverlayConfig, ...config}
		const overlayRef = this.createOverlay(dialogConfig)

		overlayRef.backdropClick;

		const portal = new ComponentPortal(component)
		overlayRef.attach(portal)

		const dialogRef = new TMOverlayRef(overlayRef)
		return dialogRef;
		// const overlayRef = this.overlay.create();
		// overlayRef.attach(portal)
	}

	private createOverlay(config: TMOverlayConfig): OverlayRef {
		const overlayConfig = this.getOverlayConfig(config);
		return this.overlay.create(overlayConfig);
	}

	private getOverlayConfig(config: TMOverlayConfig): OverlayConfig {
		const positionStrategy = this.overlay.position()
			.global()
			.centerHorizontally()
			.centerVertically();

	    const overlayConfig = new OverlayConfig({
			hasBackdrop: config.hasBackdrop,
			// backdropClass: config.backdropClass,
			panelClass: config.panelClass,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			positionStrategy
	    });

	    return overlayConfig;
	}
}