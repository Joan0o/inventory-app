
import { Component } from '@angular/core';
import { Header } from '../util/header/header';
import { Footer } from '../util/footer/footer';
import { Router } from '@angular/router';
import { UserDetails } from '../../services/users/user-details';
import { UsersService } from '../../services/users/users-service';
import { FormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-users-login',
  imports: [
    Header, Footer, FormsModule
  ],
  templateUrl: './users-login.html',
  styleUrl: './users-component.sass'
})

@UntilDestroy()
export class usersLogin {
  list: UserDetails[] = [];
  user: any = {
    username: '',
    password: ''
  }

  constructor(
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit() { }

  login() {
    this.userService
      .login(this.user)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('id', res.id);

          this.router.navigate(['products'], { replaceUrl: false });
        } else {
          alert(res.message);
        }
      });
  }
}
