import { Component, ContentChildren, AfterContentInit, QueryList, Input } from '@angular/core';

@Component({
	selector: 'tm-accordion',
	template: '<ng-content></ng-content>'
})

export class AccordionComponent { }