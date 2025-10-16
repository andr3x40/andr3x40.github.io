import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * `FormService` is a service for better validating forms. And that's it.
 * Because Angular Forms' validation is broken.
 * @author andr3x40
 */
@Injectable({
  providedIn: 'root'
})
export class FormService {

  /**
   * Checks the validity of a field in a form.
   * @param form the form to check in
   * @param field the field of the given form to check
   * @returns `false` if it's invalid, `true` in all other cases
   */
  public checkFieldValidity(form: FormGroup, field: string) : boolean {
    return form.get(field)?.status !== 'INVALID';
  }

  /**
   * Checks if a field in a form is disabled.
   * @param form the form to check in
   * @param field the field of the given form to check
   * @returns `true` if it's disabled, `false` otherwise
   */
  public checkFieldDisable(form: FormGroup, field: string) : boolean {
    return form.get(field)?.status === 'DISABLED';
  }

  /**
   * Checks the validity of a group of forms.
   * @param forms the forms to check
   * @returns `true` if all given forms are valid, `false` if at least one control in these forms is invalid
   */
  public checkFormsValidity(forms: FormGroup<any>[]): boolean {
    for (let form of forms) {
      // it could've been O(n)...
      if (!this.checkFormValidity(form)) return false;
    }
    return true;
  }

  /**
   * Checks the validity of a {@link FormGroup}.
   * @param form the form to check
   * @returns `true` if all fields are valid, `false` if at least one is not valid
   */
  public checkFormValidity(form: FormGroup): boolean {
    // can't use form.errors because angular forms are damn broken.
    // check every single control by hand, inflating this method from O(1) to O(n)
    // I'm really enjoying this.
    for (let key in form.controls) {
      let valid: boolean = this.checkFieldValidity(form, key);
      if (!valid) return false;
    }
    return true;
  }

}