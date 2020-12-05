import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {tokenName} from '@angular/compiler';
import {AlertifyService} from '../_services/alertify.service';
import {Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in success', () => {
      });
      this.router.navigate(['/employee']);
    }, (error) => {
      this.alertify.error('Failed to login', () => {
      });
    });
  }

  // tslint:disable-next-line:typedef
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('token');
    this.alertify.success('Logged out', () => {
    });
    this.router.navigate(['/home']);
  }

}
