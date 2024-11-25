import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // Torna o AppComponent standalone
  imports: [RouterModule, NavbarComponent] // Adicione o RouterModule e NavbarComponent
})
export class AppComponent {}
