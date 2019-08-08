// import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from "@angular/core"
// import { ComponentPortal, DomPortalHost } from "@angular/cdk/portal"
// import { Overlay, OverlayConfig } from "@angular/cdk/overlay"


// @Injectable()
// export class OverlayService {
// 	private portalHost: DomPortalHost
// 	private portal: ComponentPortal<any>


// 	constructor(private overlay: Overlay) {

// 	}

// 	open(dialogRef: any) {
// 		// returns an OverlayRef, which is a PortalHost
// 		const overlayRef = this.overlay.create()

// 		// create ComponentPortal taht can be attached to a PortalHost
// 		const portal = new ComponentPortal(dialogRef)

// 		// attach ComponentPortal to PortalHost
// 		overlayRef.attach(portal)
// 	}
// }

import { Injectable } from "@angular/core"
import { ComponentPortal  } from "@angular/cdk/portal"
import { Overlay } from "@angular/cdk/overlay"