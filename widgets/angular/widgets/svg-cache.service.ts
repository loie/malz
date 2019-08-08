import { Inject, Injectable, RendererFactory2, Renderer2 } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, finalize, share } from 'rxjs/operators';


@Injectable()
export class SVGCacheService {
	private static cache: Map<string, SVGElement>
	private static inProgressRequests: Map<string, Observable<SVGElement>>
	private baseUrl: string
	private renderer: Renderer2

	constructor(
		private http: HttpClient,
		private rendererFactory: RendererFactory2

	) {
		this.renderer = this.rendererFactory.createRenderer(null, null)
		this.baseUrl = "resources/img/icons/"
		if (!SVGCacheService.cache) {
     		SVGCacheService.cache = new Map<string, SVGElement>();
    	}
    	if (!SVGCacheService.inProgressRequests) {
      		SVGCacheService.inProgressRequests = new Map<string, Observable<SVGElement>>();
    	}
	}


	getAbsoluteUrl(url: string): string {
	    // Prepend user-configured base if present and URL doesn't seem to have its own
	    if (this.baseUrl && !/^https?:\/\//i.test(url)) {
	    	url = this.baseUrl + url + ".svg";

	        // Convert leading "//" to "/" to prevent a malformed URL
	        // See https://github.com/arkon/ng-inline-svg/issues/50
	        if (url.indexOf('//') === 0) {
	        	url = url.substring(1);
	      	}
	    }

	    const base = this.renderer.createElement('BASE');
	    base.href = url;
	    return base.href;
  	}

	public getSVG(url: string): Observable<SVGElement> {
	    const absUrl = this.getAbsoluteUrl(url);

	    // Return cached copy if it exists
	    if (SVGCacheService.cache.has(absUrl)) {
	      return of(this.cloneSVG(SVGCacheService.cache.get(absUrl)));
	    }

	    // Return existing fetch observable
	    if (SVGCacheService.inProgressRequests.has(absUrl)) {
	      return SVGCacheService.inProgressRequests.get(absUrl);
	    }

	    // Otherwise, make the HTTP call to fetch
	    const req = this.http.get(absUrl, { responseType: 'text' })
	      .pipe(
	        finalize(() => {
	          SVGCacheService.inProgressRequests.delete(absUrl);
	        }),
	        share(),
	        map((svgText: string) => {
	          const svgEl = this.svgElementFromString(svgText);
	          SVGCacheService.cache.set(absUrl, svgEl);
	          return this.cloneSVG(svgEl);
	        })
	      );

	    SVGCacheService.inProgressRequests.set(absUrl, req);

	    return req;
  	}

  	private cloneSVG(svg: SVGElement): SVGElement {
    	return svg.cloneNode(true) as SVGElement
  	}

  	private svgElementFromString(str: string): SVGElement | never {
	    const div = this.renderer.createElement('div');
	    div.innerHTML = str;

	    const svg = div.querySelector('svg') as SVGElement;

	    if (!svg) {
	      throw new Error('No SVG found in loaded contents');
	    }

	    return svg;
  	}

}