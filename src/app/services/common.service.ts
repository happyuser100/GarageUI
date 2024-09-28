import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router, private snackBar: MatSnackBar) {
  }

  displayMessage(message: string) {
    this.snackBar.open(message, "", {
      duration: 5000,
    });
  }

  handleError = (error: any) => {
    let errorMessage = '';
    let errorMessageSnack = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      if (error.error !== "undefined") {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\n Error:${error.error}`;
        errorMessageSnack = `Error:${error.error}`;
        console.log("errorMessage", errorMessage);
      }
      this.snackBar.open(errorMessage, "", {
        duration: 5000,
      });
    }
    //console.log(errorMessage);
    return throwError(error);
  }

}
