import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  users$: Observable<User[]>;
  displayedColumns = [
    'id',
    'name',
    'email',
    'cellphone',
    'username',
    'actions',
  ];

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.users$ = userService.findAll();
  }

  ngOnInit(): void {}

  newUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  remove(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.userService.delete(id).subscribe((res) => this.findAll());
    }
  }

  findAll() {
    this.users$ = this.userService.findAll();
  }

  edit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }
}
