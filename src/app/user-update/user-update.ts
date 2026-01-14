import { Component } from '@angular/core';
import { UserRequestDTO } from '../dto/UserRequestDTO';

@Component({
  selector: 'app-user-update',
  imports: [],
  templateUrl: './user-update.html',
  styleUrl: './user-update.css',
})
export class UserUpdate {

  user: UserRequestDTO = {
    username: '',
    email: ''
  }

}
