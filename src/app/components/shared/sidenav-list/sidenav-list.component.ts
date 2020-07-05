import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  isAuthSub: Subscription;

  isAdmin: boolean = false;
  isAdminSub: Subscription;

  userName: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;

      this.isAdminSub = this.authService.isAdminChanged.subscribe((data) => {
        this.isAdmin = data;
      })

      if (this.isAuth === true) {
        var email = localStorage.getItem('email');
        this.userName = email.substring(0, email.lastIndexOf("@"));
      }
    })

  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
