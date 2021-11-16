import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMapTo, take, tap } from "rxjs/operators";
import { Profile } from "src/app/CoreModule/interfaces/profile";
import { UserService } from "src/app/CoreModule/services/user/user.service";
@Injectable({
  providedIn: 'root',
})
export class ValidateUsername {
    constructor(private userService: UserService) {
    }
    public validatorUsername(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any}|any => {
          this.userService.checkUsername(control.value).subscribe(
              (data:any) => {
                let res: string = data['profile']?.username;
                console.log(res)
                if (res) {
                  return {'userExist': true};
                } else {
                  return null
                }
              },
              (error) => {
                return null;
              }
            )
        }
    // static createValidator(service: UserService) {
    //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
    //     if (!control.valueChanges || control.pristine) {
    //       return of(null);
    //     } else {
    //       return control.valueChanges.pipe(
    //         debounceTime(300),
    //       distinctUntilChanged(),
    //       take(1),
    //       switchMapTo(service.checkUsername(String(control.value))),
    //       tap(() => control.markAsTouched()),
    //       map((data:any) => ((data['profile']?.username) ? { userExist: true} : null))
            
    //       );
    //     }
    //   };
    // }
  }
}
