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
}  