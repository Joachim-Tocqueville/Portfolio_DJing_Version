import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Menu } from './components/menu/menu';
import { Formcontact } from './components/formcontact/formcontact';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Menu, Formcontact],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
