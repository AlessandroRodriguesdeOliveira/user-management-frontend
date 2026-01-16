import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../service/service';
import { UserResponseDTO } from '../dto/UserResponseDTO';

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

  ngOnInit(){
    const id = this.url.snapshot.paramMap.get('id');
    if(id){
      this.id = Number(id);
      this.search();
    }else{
      this.cancelar();
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
        console.log("Error: ", err.error.message);
      })
    })
  }

  cancelar(){
    this.router.navigate(['/user'], { replaceUrl: true });
  }

  deletarUser(){
    this.service.delete(this.id).subscribe({
      next: () =>{ 
        console.log("OK")
        this.cancelar();
      },
      error: err => console.log("Error:", err.error.message)
    });
  }

}
