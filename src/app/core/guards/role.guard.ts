import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {

    const rol = localStorage.getItem('rol');

    if (!rol) {
      this.router.navigate(['/']);
      return false;
    }

    const rolesPermitidos = route.data?.['roles'] as string[];

    if (!rolesPermitidos) return true;

    if (rolesPermitidos.includes(rol)) return true;

    this.router.navigate(['/dashboard']);
    return false;
  }

}
