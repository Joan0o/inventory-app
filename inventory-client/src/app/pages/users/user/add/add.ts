import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDetails } from '../../../../services/users/user-details';
import { UsersService } from '../../../../services/users/users-service';
import { Header } from '../../../util/header/header';
import { Footer } from '../../../util/footer/footer';
import { Navbar } from '../../../util/navbar/navbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    Header, Footer, Navbar
  ],
  templateUrl: './add.html',
  styleUrl: './add.sass'
})
export class Add {
  isSubmitting = false;
  message = '';

  userForm!: any;
  newuser: UserDetails = {
    id: -1,
    name: 'peperazo',
    encrypted_password: '321321',
    salt: '321321',
    status: 'inactive',
    role: 'basic',
    deleted: 0,
    access_token: '0'
  };

  constructor(
    private fb: FormBuilder, 
    private userService: UsersService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  submit() {
    if (this.userForm.invalid) return;

    this.isSubmitting = true;

    this.message = '';

    const { username, email, password, role, status } = this.userForm.value;

    this.newuser.id = 50001197;
    this.newuser.name = username;
    this.newuser.encrypted_password = password;
    this.newuser.role = role;
    this.newuser.status = status;

    this.userService.create(this.newuser).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.message = '✅ perfecto!';
        this.userForm.reset();
      },
      error: err => {
        this.isSubmitting = false;
        this.message = '❌ :/';
        console.error(err);
      }
    });
  }

  cancel() {
    this.router.navigate(['users']);
  }
}
