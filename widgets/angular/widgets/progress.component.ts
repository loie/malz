import { Component, Input } from "@angular/core";

@Component ({
	selector: "tm-progress",
	templateUrl: "app/widgets/progress.component.html",
	styleUrls: ["app/widgets/progress.component.css"]
})

export class ProgressComponent {

	private UIButtonContext = UIButtonContext;
	@Input() context: UIButtonContext = UIButtonContext.Default
	@Input() value: number = 0
	@Input() max?: number = 100
}