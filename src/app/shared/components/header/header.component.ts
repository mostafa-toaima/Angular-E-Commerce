import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isAuth = false;
  private userSub!: Subscription;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onLogOut() {
    this.authService.onLogOut();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
