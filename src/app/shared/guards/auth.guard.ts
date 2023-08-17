import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AUTHSERVICE } from 'src/app/core/tokens';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AUTHSERVICE);
  return authService.authCheck(state.url);
};
