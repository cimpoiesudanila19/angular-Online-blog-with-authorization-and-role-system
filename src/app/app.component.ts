import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  template: `
    <h1>Users</h1>
    <ul>
      <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
    <input [(ngModel)]="newUserName" name="userName" placeholder="Enter User Name">
    <button (click)="addUser()">Add User</button>
  `
})
export class AppComponent implements OnInit {
  users: User[] = [];
  newUserName: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((response: { _embedded: { users: User[] } }) => {
        this.users = response._embedded.users;
      });
  }

  addUser() {
    if (this.newUserName.trim()) {
      const newUser: User = {
        id: null,
        name: this.newUserName.trim()
      };
      this.userService.addUser(newUser)
        .subscribe((response: User) => {
          this.users.push(response);
          this.newUserName = ''; // Clear the input field
        });
    }
  }
}
