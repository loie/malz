import { Component, ContentChildren, AfterContentInit, QueryList, Input } from '@angular/core';

@Component({
	selector: 'tm-accordion-item',
	templateUrl: 'app/widgets/accordion/item.component.html',
	styleUrls: ['app/widgets/accordion/item.component.css'],
	host: {'[class.is-active]': 'expanded'}
})

export class AccordionItemComponent {
	@Input() expanded: boolean = true;
	@Input() title: string = undefined;

	private toggleExpanded(): boolean {
		this.expanded = !this.expanded;
		return this.expanded;
	}
}