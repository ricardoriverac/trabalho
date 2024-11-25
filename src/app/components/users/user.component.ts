import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFormComponent } from './components/form/user-form.component';
import { UserListComponent } from './components/list/user-list.component';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [CommonModule, UserFormComponent, UserListComponent, ReactiveFormsModule],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  editingUser: User | null = null;

  isLoading = false; // Estado de carregamento
  isSaving = false; // Estado ao salvar ou editar
  errorMessage = ''; // Mensagem de erro

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Carregar usuários
  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data.users;
        this.isLoading = false;
      },
      () => {
        this.errorMessage = 'Erro ao carregar usuários. Tente novamente mais tarde.';
        this.isLoading = false;
      }
    );
  }

  // Manipular evento de salvar
  handleSaveUser(user: User): void {
    if (this.editingUser) {
      this.updateUser(user); // Atualiza o usuário existente
    } else {
      this.addUser(user); // Adiciona um novo usuário
    }
  }

  // Adicionar um novo usuário
  addUser(user: User): void {
    this.isSaving = true;
    const newUser: User = {
      id: this.users.length > 0 ? Math.max(...this.users.map((u) => u.id)) + 1 : 1,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    this.users = [newUser, ...this.users]; // Adiciona localmente
    this.isSaving = false;
  }

  // Atualizar usuário existente
  updateUser(user: User): void {
    this.isSaving = true;
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      this.users[index] = user; // Atualiza localmente
    }
    this.editingUser = null; // Sai do modo de edição
    this.isSaving = false;
  }

  // Excluir usuário
  deleteUser(id: number): void {
    this.isSaving = true;
    this.users = this.users.filter((user) => user.id !== id); // Remove localmente
    this.isSaving = false;
  }

  // Editar usuário
  editUser(user: User): void {
    this.editingUser = user;
    this.userForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }
}
