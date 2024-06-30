import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.status === 200) {
          this.router.navigate(['/tasks']);
        } else {
          this.error = 'Login failed';
        }
      },
      (error) => {
        this.error = 'Invalid email or password';
        console.error('Login error', error);
      }
    );
  }
}