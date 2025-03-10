import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


export const connectedGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthenticationService);
  const router=inject(Router);
  if(authService.isLoggedIn)
    return true;
  else
  {
   router.navigate(['/login']);//check to where its guide me
   return false;
  }
};
