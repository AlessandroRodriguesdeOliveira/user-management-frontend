import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Service } from '../service/service';
import { UserResponseDTO } from '../dto/UserResponseDTO'; 
import { UserPage } from '../dto/UserPageDTO';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-main',
  imports: [RouterLink],
  templateUrl: './user-main.html',
  styleUrl: './user-main.css',
})
export class UserMain {

  userServ = inject(Service);
  cdf = inject(ChangeDetectorRef);

  users:UserResponseDTO[] = [];
  page = 0;
  totalPages = 0;
  loading = false;

  ngOnInit(){
    this.listAll();
  }
  

  listAll(){
    this.loading = true;
    this.userServ.listAll(this.page, 5).subscribe({
      next : (page : UserPage<UserResponseDTO> ) => {
        this.users = [...this.users, ...page.content];
        this.totalPages = page.totalPages;
        this.loading = false;
        this.cdf.detectChanges();
      },
      error: err => {
        this.loading = false;
        console.error("Error:", err.error.status, err.error.message);
      }
    });
  }

  hasNextPage(): boolean{
    return this.page + 1 < this.totalPages

  }

  load(){
    if(!this.hasNextPage()){return}
    this.page++;
    this.listAll();
  }

  search(id: string){
    this.loading = true;
    this.userServ.listUser(Number(id)).subscribe({
      next : (data:UserResponseDTO) => {
        this.users = [];
        this.users = [data];
        this.loading = false;
        this.cdf.detectChanges();
      },
      error: err => {
        this.loading = false;
        console.error("Error:", err.error.status, err.error.message);
      }
    })
  }

  reset(input: HTMLInputElement){
      input.value = '';
      this.users = [];
      this.page = 0;
      this.totalPages = 0;
      this.listAll();
    }

}
