
import { Component, inject, Input } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users/users-service';
import { UserDetails } from '../../../services/users/user-details';

@Component({
  selector: 'app-user-component',
  imports: [FormsModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.sass'
})

export class UserComponent {

  private userService = inject(UsersService);

  @Input({ required: true }) user!: UserDetails;

  isEditing = false;
  editedUser!: UserDetails;
  newpassword: string = '';
  enablenewPassword: boolean = false;

  ngOnInit() {
    this.editedUser = { ...this.user };
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.user = { ...this.editedUser };
    
    if(this.newpassword !== '')
      if(!confirm('Está segurode que quiere cambiar la contraseña?'))
        return;

    console.log(this.user);

    this.isEditing = false;
    this.userService.update(this.user.id, this.user).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
      },
      error: (error) => {
        console.error('Update failed:', error);
      }
    });
  }

  cancelEdit() {
    this.editedUser = { ...this.user };
    this.isEditing = false;
  }

  enable() {
    this.enablenewPassword = !this.enablenewPassword;
  }

}
