import { Component, Input, OnInit } from '@angular/core';
import { Injection } from "../injection/injection.service";
import { I18nService } from 'app/shared/i18n.service';

@Component({
	selector: 'tm-dialog',
	templateUrl: 'app/widgets/dialog/dialog.component.html',
	styleUrls: ['app/widgets/dialog/dialog.component.css']
})

export class DialogComponent implements OnInit {
	protected UIButtonContext = UIButtonContext;
	private active: boolean = false;
	private fading: boolean = false;

	@Input() title: string = "";
	@Input() cancelLabel: string = this.i18n.getLocalizedString('BUTTON_CANCEL');
	@Input() fullwidth: boolean = false;

	constructor(private injection: Injection, private i18n: I18nService) { }

	ngOnInit() {
        this.injection.options.subscribe(value => {
			this.fullwidth = value ? value.fullwidth : false;
        })
    }

	public ngAfterViewInit() {
		setTimeout(() => {
			this.active = true;
		}, 10);
	}

	private closeDialog(): void {
		this.fading = true;
		setTimeout(() => {
			this.injection.close();
		}, 1000);
	}
}