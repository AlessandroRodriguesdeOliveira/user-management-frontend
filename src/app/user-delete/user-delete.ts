import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../service/service';
import { ErrorAlertDTO } from '../dto/ErrorAlertDTO';

@Component({
  selector: 'app-user-delete',
  imports: [],
  templateUrl: './user-delete.html',
  styleUrl: './user-delete.css',
})
export class UserDelete {
  url = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(Service);
  cdf = inject(ChangeDetectorRef);


  id!: number;
  username!:string;
  email!:string;

  error: ErrorAlertDTO | null = null;

  ngOnInit(){
    const id = this.url.snapshot.paramMap.get('id');
    if(id){
      this.id = Number(id);
      this.search();
    }else{
      this.cancel();
    }
  }

  search(){
    this.service.listUser(this.id).subscribe({
      next: (data => {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.cdf.detectChanges();
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

  cancel(){
    this.router.navigate(['/user'], { replaceUrl: true, queryParams: {refresh: true} });
  }

  deleteUser(){
    if(this.id <= 0){
      return;
    }
    this.service.delete(this.id).subscribe({
      next: () =>{ 
        this.cancel();
      },
      error: (err => {
        this.error = {
          status: err.error.status,
          message: err.error.message
        }
        this.cdf.detectChanges();
      })
    });
  }

  closeError(){
    this.error = null;
  }
}
