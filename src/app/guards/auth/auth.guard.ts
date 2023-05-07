import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (!this.jwtService.isLoggedIn()) {
      this.router.navigate(['/register']);
      return false;
    }
    return true;
  }
  
}
