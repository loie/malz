import { Injectable, RendererFactory2, Renderer2 } from "@angular/core"
import { InlineSVGDirective } from "./inline-svg.directive"

@Injectable()
export class InlineSVGService {

	private renderer: Renderer2

	constructor(rendererFactory: RendererFactory2) {
		this.renderer = rendererFactory.createRenderer(null, null);
	}

	insertEl(dir: InlineSVGDirective, parentEl: HTMLElement, content: Element) {
		const parentNode = dir.prevSVG && dir.prevSVG.parentNode
      	if (parentNode) {
        	this.renderer.removeChild(parentNode, dir.prevSVG);
      	}

      	parentEl.innerHTML = ''
      	this.renderer.appendChild(parentEl, content);

      	if (content.nodeName === 'svg') {
      		dir.prevSVG = content as SVGElement;
    	}
		
	}

	
}