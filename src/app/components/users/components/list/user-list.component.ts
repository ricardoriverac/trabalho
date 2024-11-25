import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Input() isSaving = false;
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number>();
}
