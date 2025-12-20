import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';
import { Formcontact } from '../formcontact/formcontact';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule, RouterLink, Header, Menu, Formcontact],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {

}
