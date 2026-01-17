import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Service } from '../service/service';
import { UserResponseDTO } from '../dto/UserResponseDTO'; 
import { UserPage } from '../dto/UserPageDTO';
import { RouterLink } from "@angular/router";
import { ErrorAlertDTO } from '../dto/ErrorAlertDTO';

@Component({
  selector: 'app-user-main',
  imports: [RouterLink],
  templateUrl: './user-main.html',
  styleUrl: './user-main.css',
})
export class UserMain {

  userServ = inject(Service);
  cdf = inject(ChangeDetectorRef);

  error: ErrorAlertDTO | null = null;

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
        this.error = {
          status: err.error.status,
          message: err.error.message
        }
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
    if(!id) return;
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

  reset(input: HTMLInputElement){
      input.value = '';
      this.users = [];
      this.page = 0;
      this.totalPages = 0;
      this.listAll();
    }

}
