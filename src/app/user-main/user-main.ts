import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Service } from '../service/service';
import { UserResponseDTO } from '../dto/UserResquestDTO';
import { UserRequestDTO } from '../dto/UserResponseDTO';
import { UserPage } from '../dto/UserPageDTO';

@Component({
  selector: 'app-user-main',
  imports: [],
  templateUrl: './user-main.html',
  styleUrl: './user-main.css',
})
export class UserMain {

  userServ = inject(Service);
  cdf = inject(ChangeDetectorRef);

  users:UserRequestDTO[] = [];
  page = 0;
  totalPages = 0;
  loading = false;

  ngOnInit(){
    this.listAll();
  }

  listAll(){
    this.loading = true;
    this.userServ.listAll(this.page, 10).subscribe({
      next : (page : UserPage<UserRequestDTO> ) => {
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
