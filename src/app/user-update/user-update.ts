import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { UserRequestDTO } from '../dto/UserRequestDTO';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Service } from '../service/service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorAlertDTO } from '../dto/ErrorAlertDTO';

@Component({
  selector: 'app-user-update',
  imports: [ReactiveFormsModule],
  templateUrl: './user-update.html',
  styleUrl: './user-update.css',
})
export class UserUpdate {

  serv = inject(Service);
  route = inject(ActivatedRoute);
  cdf = inject(ChangeDetectorRef);
  router = inject(Router);

  id!: number;

  error: ErrorAlertDTO | null = null;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    if(id){
      this.list();
    }else{
      this.router.navigate(['/user'], { replaceUrl: true });
    }
    
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
        this.error = {
          status: err.error.status,
          message: err.error.message
        }
        this.cdf.detectChanges();
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

    if((!userNameChanged && !userEmailChanged) || this.id <= 0){
      return;
    }

    if(userNameChanged && userEmailChanged){
      this.serv.updateComplete(this.id, userForm).subscribe({
        next:() =>{ 
          this.userSaved = {...userForm};
          
      },
        error: err => {
          this.error = {
            status: err.error.status,
            message: err.error.message
          }
          this.cdf.detectChanges();
        }
      });
      return;
    }

    const partial: Partial<UserRequestDTO> = {};

    if (userNameChanged) partial.username = userForm.username;
    if (userEmailChanged) partial.email = userForm.email;

    this.serv.updatePartial(this.id, partial).subscribe({
      next: () => {
        this.userSaved = {...userForm};
        
    },
      error: err => {
        this.error = {
          status: err.error.status,
          message: err.error.message
        }
        this.cdf.detectChanges();
      }

    })
    return;
  }

  closeError(){
    this.error = null;
  }
}
