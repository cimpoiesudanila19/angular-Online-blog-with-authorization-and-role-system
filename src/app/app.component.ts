import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
@Component({
  selector: 'app-root',
  template: `
    <h1>Users</h1>
    <ul>
      <li *ngFor="let user of users">
        {{ user.id }} {{ user.name }}
        <button (click)="deleteUser(user)">Delete</button>
        <button (click)="editUser(user)">Edit</button>
        <input [(ngModel)]="editName" *ngIf="editUserId === user.id" placeholder="Enter new name">
        <button (click)="saveUser(user)" *ngIf="editUserId === user.id">Save</button>
      </li>
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

  editUserId: number | null = null;
  editName: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        (response: User[]) => {
          this.users = response;
        }
      );
  }

  addUser() {
    const newUser: User = {
      name: this.newUserName
    };

    this.userService.addUser(newUser)
      .subscribe(
        (response: User) => {
          this.users.push(response);
          this.newUserName = ''; // Сбросить поле ввода после успешного добавления пользователя
          this.ngOnInit(); // Обновить список пользователей
        }
      );
  }

  deleteUser(user: User) {
    if (user.id) {
      this.userService.deleteUser(user.id)
        .subscribe(
          () => {
            this.users = this.users.filter(u => u.id !== user.id);
          }
        );
    }
  }  

  updateUser(user: User) {
    this.userService.updateUser(user)
      .subscribe(
        (updatedUser: User) => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
        }
      );
  }

  editUser(user: User) {
    this.editUserId = user.id!;
    this.editName = user.name;
  }

  saveUser(user: User) {
    if (this.editUserId === user.id) {
      user.name = this.editName;
      this.editUserId = null;

      this.userService.updateUser(user)
        .subscribe(
          (updatedUser: User) => {
            const index = this.users.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) {
              this.users[index] = updatedUser;
            }
          }
        );
    }
  }


}