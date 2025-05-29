import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavController, AlertController  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
      private authService: AuthService, 
      private navCtrl: NavController, 
      private fb: FormBuilder, 
      private alertController: AlertController,
      private router: Router
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.logIn(email, password).subscribe(
        (response) => {
          this.authService.saveToken(response.token); // Guarda el token
          const decodedToken = this.authService.decodeToken(response.token); // Decodifica el token
          if (decodedToken && decodedToken.ownerId) { // Asegúrate de que el ID del propietario exista
            this.router.navigate(['/owner-businesses', decodedToken.ownerId]); // Redirige al ID del propietario
          } else {
            console.error("Owner ID not found in token");
          }
        },
        (error) => {
          this.loginError = 'Invalid email or password'; // Manejo de errores
          console.error("Login error", error);
        }
      );
    }
  }
  
}  