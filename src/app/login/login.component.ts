import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  currentDateTime: Date = new Date();
  estTime: string = '';
  istTime: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Update every second
  }

  updateTime() {
    this.currentDateTime = new Date();
    
    // EST Time
    const estOptions: Intl.DateTimeFormatOptions  = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    this.estTime = this.currentDateTime.toLocaleString('en-US', estOptions);

    // IST Time
    const istOptions: Intl.DateTimeFormatOptions  = {  timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    this.istTime = this.currentDateTime.toLocaleString('en-US', istOptions);
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/tasks']);
      },
      (error) => {
        this.error = 'Invalid email or password';
        console.error('Login error', error);
      }
    );
  }
}