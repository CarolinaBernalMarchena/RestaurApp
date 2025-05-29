import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class isUserLoggedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {}

  public async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      if (this.authService.isLoggedIn()) {
          const alert = await this.alertController.create({
              header: 'Login Failed',
              message: 'Email or password is incorrect',
              buttons: ['OK']
          });
          await alert.present();
          this.router.navigate(['/login']);
          return false;
      }
      return true;
  }
}

