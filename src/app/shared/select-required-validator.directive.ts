import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive, Input, } from '@angular/core';

@Directive({
  selector: '[appSelectValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SelectRequiredValidatorDirective,
    multi: true
  }]
})
export class SelectRequiredValidatorDirective implements Validator {
  @Input('appSelectValidator')defaultValue: string;
  // input selector "appSelectValidator" into Input(), then we can use alias like "defaultValue"
  validate(control: AbstractControl): { [Key: string]: any } | null {
    return  control.value === this.defaultValue ? {defaultSelected: true} : null;
  }
}

