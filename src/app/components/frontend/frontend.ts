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
  // On utilise ngAfterViewInit pour s'assurer que le template est chargé
  ngAfterViewInit(): void {
    const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e: MouseEvent) => {
        const href = link.getAttribute('href');
        if (!href) return;
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          const headerElem = document.querySelector('.main-header') as HTMLElement | null;
          const headerHeight = headerElem?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}
