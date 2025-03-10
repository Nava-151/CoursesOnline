import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const teacherConnectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = Inject(Router);
  if (authService.isLoggedIn && authService.isTeacher == true)
    return true;
  else
  {
    router.navigate(['login']);
    return false;
    
  }
};
