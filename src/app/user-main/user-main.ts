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
        this.users = page.content;
        this.totalPages = page.totalElements;
        this.loading = false;
        this.cdf.detectChanges();
      },
      error: () => this.loading = false
    });
  }

  carregarMais(){
    if(this.page + 1 < this.totalPages){
      this.page++;
      this.listAll()
    }
  }

}
