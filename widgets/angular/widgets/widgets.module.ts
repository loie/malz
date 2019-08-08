import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OverlayModule } from "@angular/cdk/overlay"

import { ButtonComponent } from "./button.component"
import { ProgressComponent } from "./progress.component"
import { ToggleButtonComponent } from "./toggle-button.component"
import { ButtonRowComponent } from "./button-row.component"
import { RadioFieldComponent } from "./radio-field.component"
import { RadioButtonComponent } from "./radio-button.component"
import { DropdownComponent } from "./dropdown/dropdown.component"
import { DropdownItemComponent } from "./dropdown/item.component"
import { DropdownDividerComponent } from "./dropdown/divider.component"
import { ToolbarComponent } from "./toolbar/toolbar.component"
import { ToolbarStartComponent } from "./toolbar/start.component"
import { ToolbarEndComponent } from "./toolbar/end.component"
import { ToolbarDividerComponent } from "./toolbar/divider.component"
import { ToolbarButtonComponent } from "./toolbar/button.component"
import { ToolbarTextComponent } from "./toolbar/text.component"
import { ToolbarDropdownComponent } from "./toolbar/dropdown/dropdown.component"
import { ToolbarDropdownItemComponent } from "./toolbar/dropdown/item.component"
import { ToolbarDropdownDividerComponent } from "./toolbar/dropdown/divider.component"
import { NavlistComponent } from "./navlist/navlist.component"
import { NavlistItemComponent } from "./navlist/item.component"
import { NavlistDropdownComponent } from "./navlist/dropdown/dropdown.component"
import { NavlistDropdownItemComponent } from "./navlist/dropdown/item.component"
import { NavlistDropdownDividerComponent } from "./navlist/dropdown/divider.component"
import { TextInputComponent } from "./input/text.component"
import { TextareaInputComponent } from "./input/textarea.component"
import { PasswordInputComponent } from "./input/password.component"
import { CheckboxComponent } from "./input/checkbox.component"
import { RangeComponent } from "./input/range.component"
import { AccordionComponent } from "./accordion/accordion.component"
import { AccordionItemComponent } from "./accordion/item.component"
import { TabsComponent } from "./tabs/tabs.component"
import { TabItemComponent } from "./tabs/item.component"
import { ContextMenuComponent } from "./contextmenu/contextmenu.component"
import { ContextMenuItemComponent } from "./contextmenu/item.component"
import { DialogAdditional } from "./dialog/additional.component"
import { DialogBody } from "./dialog/body.component"
import { DialogPrimaryAction } from "./dialog/primary-action.component"
import { DialogComponent } from "./dialog/dialog.component"
import { Injection } from "./injection/injection.service"
import { InlineSVGDirective } from "./inline-svg.directive"
import { InlineSVGService} from "./inline-svg.service"
import { SVGCacheService } from "./svg-cache.service"

@NgModule({
    imports: [
        CommonModule,

    ],
    declarations: [
        ButtonComponent,
        ProgressComponent,
        ToggleButtonComponent,
        ButtonRowComponent,
        RadioFieldComponent,
        RadioButtonComponent,
        DropdownComponent,
        DropdownItemComponent,
        DropdownDividerComponent,
        ToolbarComponent,
        ToolbarStartComponent,
        ToolbarEndComponent,
        ToolbarDividerComponent,
        ToolbarButtonComponent,
        ToolbarTextComponent,
        ToolbarDropdownComponent,
        ToolbarDropdownItemComponent,
        ToolbarDropdownDividerComponent,
        NavlistComponent,
        NavlistItemComponent,
        NavlistDropdownComponent,
        NavlistDropdownItemComponent,
        NavlistDropdownDividerComponent,
        TextInputComponent,
        TextareaInputComponent,
        PasswordInputComponent,
        CheckboxComponent,
        RangeComponent,
        AccordionComponent,
        AccordionItemComponent,
        TabsComponent,
        TabItemComponent,
        DialogAdditional,
        DialogBody,
        DialogPrimaryAction,
        DialogComponent,
        InlineSVGDirective,
        ContextMenuComponent,
        ContextMenuItemComponent
    ],
    entryComponents: [
        ButtonComponent,
        ProgressComponent,
        ToggleButtonComponent,
        ButtonRowComponent,
        RadioFieldComponent,
        RadioButtonComponent,
        DropdownComponent,
        DropdownItemComponent,
        DropdownDividerComponent,
        ToolbarComponent,
        ToolbarTextComponent,
        ToolbarStartComponent,
        ToolbarEndComponent,
        ToolbarDividerComponent,
        ToolbarButtonComponent,
        ToolbarDropdownComponent,
        ToolbarDropdownItemComponent,
        ToolbarDropdownDividerComponent,
        NavlistComponent,
        NavlistItemComponent,
        NavlistDropdownComponent,
        NavlistDropdownItemComponent,
        NavlistDropdownDividerComponent,
        TextInputComponent,
        TextareaInputComponent,
        PasswordInputComponent,
        CheckboxComponent,
        RangeComponent,
        AccordionComponent,
        AccordionItemComponent,
        TabsComponent,
        TabItemComponent,
        DialogAdditional,
        DialogBody,
        DialogPrimaryAction,
        DialogComponent,
        ContextMenuComponent,
        ContextMenuItemComponent
    ],
    exports: [
        ButtonComponent,
        ProgressComponent,
        ToggleButtonComponent,
        ButtonRowComponent,
        RadioFieldComponent,
        RadioButtonComponent,
        DropdownComponent,
        DropdownItemComponent,
        DropdownDividerComponent,
        ToolbarComponent,
        ToolbarTextComponent,
        ToolbarStartComponent,
        ToolbarEndComponent,
        ToolbarDividerComponent,
        ToolbarButtonComponent,
        ToolbarDropdownComponent,
        ToolbarDropdownItemComponent,
        ToolbarDropdownDividerComponent,
        NavlistComponent,
        NavlistItemComponent,
        NavlistDropdownComponent,
        NavlistDropdownItemComponent,
        NavlistDropdownDividerComponent,
        TextInputComponent,
        TextareaInputComponent,
        PasswordInputComponent,
        CheckboxComponent,
        RangeComponent,
        AccordionComponent,
        AccordionItemComponent,
        TabsComponent,
        TabItemComponent,
        DialogAdditional,
        DialogBody,
        DialogPrimaryAction,
        DialogComponent,
        InlineSVGDirective,
        ContextMenuComponent,
        ContextMenuItemComponent
    ],
    providers: [
        Injection,
        InlineSVGService,
        SVGCacheService
    ]
})

export class WidgetsModule {}