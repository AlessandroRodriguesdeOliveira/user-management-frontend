import { Component, inject } from '@angular/core';
import { Service } from '../service/service';
import { User } from '../dto/UserResponseDTO';

@Component({
  selector: 'app-user-main',
  imports: [],
  templateUrl: './user-main.html',
  styleUrl: './user-main.css',
})
export class UserMain {

  userServ = inject(Service);

  users:User[] = [];

  ngOnInit(){
    this.listAll();
  }

  listAll(){
    this.userServ.listAll().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

}
