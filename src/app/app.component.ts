import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
@Component({
  selector: 'app-root',
  template: `
    <h1>Users</h1>
    <ul>
      <li *ngFor="let user of users">{{ user.id }}{{ user.name }}</li>
    </ul>
    <div>
      <input [(ngModel)]="newUserName" placeholder="Enter user name">
      <button (click)="addUser()">Add User</button>
    </div>
  `
})
export class AppComponent implements OnInit {
  users: User[] = [];
  newUserName: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        (response: User[]) => {
          this.users = response;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  addUser() {
    const newUser: User = {
      id: 0, // Передайте корректное значение ID пользователя, если есть
      name: this.newUserName
    };
  
    this.userService.addUser(newUser)
      .subscribe(
        (response: User) => {
          this.users.push(response);
          this.newUserName = ''; // Сбросить поле ввода после успешного добавления пользователя
          this.updateUserList(); // Обновить список пользователей
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  
  updateUserList() {
    this.userService.getUsers()
      .subscribe(
        (response: User[]) => {
          this.users = response;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  

}  