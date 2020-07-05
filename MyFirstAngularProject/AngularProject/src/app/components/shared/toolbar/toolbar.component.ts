import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  isAuthSub: Subscription;

  isAdmin: boolean = false;
  isAdminSub: Subscription;

  username: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;

      this.isAdminSub = this.authService.isAdminChanged.subscribe((data) => {
        this.isAdmin = data;
      })

      if (this.isAuth === true) {
        var email = localStorage.getItem('email');
        this.username = email.substring(0, email.lastIndexOf("@"));
      }
    })
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
    this.isAdminSub.unsubscribe();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }



}
