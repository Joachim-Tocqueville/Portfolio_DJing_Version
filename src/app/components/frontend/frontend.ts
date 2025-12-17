import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';
import { Formcontact } from '../formcontact/formcontact';

@Component({
  selector: 'app-frontend',
  imports: [Header, Menu, Formcontact],
  templateUrl: './frontend.html',
  styleUrl: './frontend.css',
})
export class Frontend {

}
