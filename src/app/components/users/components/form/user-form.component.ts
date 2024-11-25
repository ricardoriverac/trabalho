import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserFormComponent {
  @Input() editingUser: User | null = null;
  @Input() isSaving = false;
  @Output() saveUser = new EventEmitter<User>();
  @Output() cancelEdit = new EventEmitter<void>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnChanges(): void {
    if (this.editingUser) {
      this.userForm.setValue({
        firstName: this.editingUser.firstName,
        lastName: this.editingUser.lastName,
        email: this.editingUser.email,
      });
    }
  }

  submitForm(): void {
    if (this.userForm.valid) {
      const user = { ...this.editingUser, ...this.userForm.value };
      this.saveUser.emit(user);
      this.userForm.reset();
    }
  }
}
