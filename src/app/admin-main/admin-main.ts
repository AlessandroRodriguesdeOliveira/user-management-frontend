import { Component, inject } from '@angular/core';
import { Service } from '../service/service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRequestDTO } from '../dto/UserRequestDTO';

@Component({
  selector: 'app-admin-main',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-main.html',
  styleUrl: './admin-main.css',
})
export class AdminMain {

  userService = inject(Service);

  user = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('')
  });

  register(){
    const userForm: UserRequestDTO = {
      username: this.user.value.username || '',
      email: this.user.value.email || ''
    }
        
    if(!userForm.email || !userForm.username){
      alert('Preencha todos os campos corretamente!');
      return;
    }

    this.userService.createUser(userForm).subscribe({
      next: () => console.log("OK"),
      error: err => console.log("Error: ", err.error.status, err.error.message)
    })
  }

}
