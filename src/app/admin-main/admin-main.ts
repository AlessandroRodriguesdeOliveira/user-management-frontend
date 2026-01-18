import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Service } from '../service/service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRequestDTO } from '../dto/UserRequestDTO';
import { ErrorAlertDTO } from '../dto/ErrorAlertDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-main.html',
  styleUrl: './admin-main.css',
})
export class AdminMain {

  userService = inject(Service);
  cdf = inject(ChangeDetectorRef);
  router = inject(Router);

  error: ErrorAlertDTO | null = null;

  user = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('')
  });

  register(){
    const userForm: UserRequestDTO = {
      username: this.user.value.username || '',
      email: this.user.value.email || ''
    }

    this.userService.createUser(userForm).subscribe({
      next: () => this.router.navigate(['/user'], { replaceUrl: true }),
      error: err => {
        console.log(err)
        this.error = {
          status: err.error.status,
          message: err.error.message
        }
        this.cdf.detectChanges();
      }
    })
  }

  closeError(){
    this.error = null;
  }

}
