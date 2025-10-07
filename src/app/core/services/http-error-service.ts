import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  formatError(err: HttpErrorResponse, funcName?: string): string {
    console.error(`${funcName ?? ''} error :>> `, err);
    return this.setErrorMessage(err);
  }

  private setErrorMessage(err: HttpErrorResponse): string {
    let errorMessage = '';
    if (err) {
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An Error Occurred: ${err.error.message}`;
      } else {
        const status = err.status;
        if (status === 401) errorMessage = 'You are not authorized to access this resource.';
        if (status === 404) errorMessage = 'Resource not found.';
        if (status > 500 && status < 600)
          errorMessage = 'The server is not currently working. Please try again later.';
      }
    }
    return errorMessage;
  }
}
