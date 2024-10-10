
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // Retrieve the token from sessionStorage (browser environment)
  // const token = typeof window !== 'undefined' && window.sessionStorage ? sessionStorage.getItem('jwtToken') : null;
  
  // if( typeof window !== 'undefined' ){
  //   const token= sessionStorage.getItem('jwtToken')
  //   console.log('token from session storage: ', token);
  //   if (token) {
  //     const newRequest = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     return next(newRequest);
  //   }
  // }


  // const token= sessionStorage.getItem('jwtToken')
  // Log token for debugging
  // console.log('token: ', token);


  // Clone the request and set the Authorization header if the token exists
  // if (token) {
  //   const newRequest = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   return next(newRequest);
  // }

  // Proceed with the original request if no token is found
  // return next(req);

  //  const token= window?.sessionStorage?.getItem('jwtToken')
  
  // const platformId=inject(PLATFORM_ID)

  // if (isPlatformBrowser(PLATFORM_ID)) {
    const token= sessionStorage.getItem('jwtToken')

    console.log('token from session storage: ', token);
    
      const newRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(newRequest);
  // }else{
  // // return throwError((() => new Error('Something went wrong!')))
  // return next(req);

  // }
 
  
};
