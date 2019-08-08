import { OverlayRef } from '@angular/cdk/overlay';

export class TMOverlayRef {

	constructor(private overlayRef: OverlayRef) { }

  	close(): void {
    	this.overlayRef.dispose();
  	}
}