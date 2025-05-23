import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  req=req.clone({
    setHeaders:{
      Authorization:"Token will be added"
    }
  })
  return next(req).pipe(
    catchError((err)=>{
      console.log("Error handling function invoked")
      return throwError(()=> new Error("Something went wrong"))
 } ))
};
