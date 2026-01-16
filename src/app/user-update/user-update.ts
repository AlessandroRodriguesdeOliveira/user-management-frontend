import { Component, inject, Input } from '@angular/core';
import { UserRequestDTO } from '../dto/UserRequestDTO';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Service } from '../service/service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  imports: [ReactiveFormsModule],
  templateUrl: './user-update.html',
  styleUrl: './user-update.css',
})
export class UserUpdate {

  serv = inject(Service);
  route = inject(ActivatedRoute);

  id!: number;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.list();
  }
  userSaved: UserRequestDTO = {
    username:  '',
    email: ''
  };

  user = new FormGroup({
    username: new FormControl<string>(''),
    email: new FormControl<string>(''),
  })

  list(){
    this.serv.listUser(this.id).subscribe({
      next: (data => {
        this.userSaved = data;
        this.user.get('username')?.setValue(data.username) || '';
        this.user.get('email')?.setValue(data.email) || '';
      }),
      error: (err => {
        console.log("Error: ", err.error.message);
      })
    })
  }

  update(){
    const userForm: UserRequestDTO = {
      username: this.user.value.username || '',
      email: this.user.value.email || ''
    }

    const userNameChanged = this.userSaved.username !== userForm.username;
    const userEmailChanged = this.userSaved.email !== userForm.email;

    if(!userNameChanged && !userEmailChanged){
      alert('Anything has not been changed!');
      return;
    }

    if(userNameChanged && userEmailChanged){
      this.serv.updateComplete(this.id, userForm).subscribe({
        next:() =>{ 
          this.userSaved = {...userForm};
          alert("UPATED!");
      },
        error: err => console.log("Error:", err.error.message)
      });
      return;
    }

    const partial: Partial<UserRequestDTO> = {};

    if (userNameChanged) partial.username = userForm.username;
    if (userEmailChanged) partial.email = userForm.email;

    this.serv.updatePartial(this.id, partial).subscribe({
      next: () => {
        this.userSaved = {...userForm};
        alert("UPATED!");
    },
      error: err => console.log("Error: ", err.error.message)
    })
    return;
  }
}
