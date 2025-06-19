import { Directive, forwardRef, Input } from "@angular/core";
import { Validator, ValidationErrors, AbstractControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";

@Directive({
  selector: '[numberValidator]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: forwardRef(() => NumbersOnlyDirective),
    multi: true
}],

})

 /**
   * @description Validates numerical input
  */
export class NumbersOnlyDirective implements Validator {
  
  constructor() {}
  validate(control: AbstractControl): ValidationErrors | null {
    return this.numberValidator()(control);
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const test = control.value;
        const price = Number(test);
        if(!price || price < 0.01) {
            return {'invalidNumber': true};
        }   
        return null;
    }
  }
}