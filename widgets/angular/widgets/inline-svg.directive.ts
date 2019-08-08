import { Directive, Input, Inject, ComponentRef, ElementRef, SimpleChanges } from "@angular/core"
import { Subscription } from "rxjs"
import { SVGCacheService } from "./svg-cache.service"
import { InlineSVGService } from "./inline-svg.service"


@Directive({
	selector: "[tmInlineSVG]",
	providers: [SVGCacheService]
})

export class InlineSVGDirective {
	@Input() tmInlineSVG: string
	@Input() replaceContents: boolean = true

	public prevSVG: SVGElement;

	private prevUrl: string;
	private subscription: Subscription;

	constructor(
		private el: ElementRef,
		private svgCache: SVGCacheService,
		private inlineSVGService: InlineSVGService) {}

	ngOnInit(): void {
		this.insertSVG();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["tmInlineSVG"]) {
			this.insertSVG()
		}
	}

	private insertSVG(): void {
		// Check if a URL was actually passed into the directive
		if (!this.tmInlineSVG) {
			this.fail('No URL passed to [inlineSVG]')
			return
		}

		if (this.tmInlineSVG === this.prevUrl) {
			return
		}

		this.prevUrl = this.tmInlineSVG;

		this.subscription = this.svgCache.getSVG(this.tmInlineSVG)
			.subscribe((svg: SVGElement) => {
				if (!svg) { return; }
				// Insert SVG
				this.inlineSVGService.insertEl(this, this.el.nativeElement, svg);
			})
	}

	private fail(msg: string): void {
		console.warn(msg)
	}


}

