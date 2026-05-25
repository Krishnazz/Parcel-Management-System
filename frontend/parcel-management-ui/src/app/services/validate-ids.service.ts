// username-exists.validator.ts
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { checkId } from './check-id.service';
import { debounceTime, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export function validateIds(service: checkId): AsyncValidatorFn {

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.checkUsername(control.value).pipe(
      debounceTime(300),
      map(exists => (exists ? { usernameExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
