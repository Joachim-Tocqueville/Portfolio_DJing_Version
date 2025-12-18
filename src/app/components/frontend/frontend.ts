import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';
import { Formcontact } from '../formcontact/formcontact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frontend',
  imports: [CommonModule, Header, Menu, Formcontact],
  templateUrl: './frontend.html',
  styleUrl: './frontend.css',
})
export class Frontend {

}
