
import { Component } from '@angular/core';
import { Header } from '../util/header/header';
import { Footer } from '../util/footer/footer';
import { Navbar } from '../util/navbar/navbar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserDetails } from '../../services/users/user-details';
import { UsersService } from '../../services/users/users-service';
import { UserComponent } from './user/user-component';


@Component({
  selector: 'app-users-component',
  imports: [
    Header, Footer, Navbar, UserComponent
  ],
  templateUrl: './users-component.html',
  styleUrl: './users-component.sass'
})

@UntilDestroy()
export class UsersComponent {
  list: UserDetails[] = [];

  constructor(
    private router: Router,
    private userService: UsersService
  ) {
    this.userService.getCategories().subscribe();
    this.userService.watchAllCategories().pipe(untilDestroyed(this)).subscribe(ps => this.list = ps);
  }

  add(){
    this.router.navigate(['newuser'])
  }
}
