import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';
import { Formcontact } from '../formcontact/formcontact';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-frontend',
  imports: [CommonModule, Header, Menu, Formcontact],
  templateUrl: './frontend.html',
  styleUrl: './frontend.css',
})
export class Frontend {
  private currentSelectedElement: HTMLElement | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // On utilise ngAfterViewInit pour s'assurer que le template est chargé
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Écouteur global : enlever la couleur rouge si on clique ailleurs
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isAnchorLink = target.closest('a[href^="#"]');
      
      if (!isAnchorLink && this.currentSelectedElement) {
        this.currentSelectedElement.style.color = '';
        this.currentSelectedElement = null;
      }
    });
    
    const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e: MouseEvent) => {
        const href = link.getAttribute('href');
        if (!href) return;
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          
          // Enlever la couleur rouge de l'élément précédemment sélectionné
          if (this.currentSelectedElement && this.currentSelectedElement !== targetElement) {
            this.currentSelectedElement.style.color = '';
          }

          // Appliquer la couleur rouge au nouvel élément sélectionné
          if (!targetElement.classList.contains('selected')) {
            targetElement.style.color = 'red';
            this.currentSelectedElement = targetElement;
          }

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

  sectionHeight = 425;
  isResizing = false;
  startY = 0;
  startHeight = 0;
  maxHeight = 520;

  startResize(event: MouseEvent) {
    this.isResizing = true;
    this.startY = event.clientY;
    this.startHeight = this.sectionHeight;
    
    // Empêche la sélection de texte pendant le drag
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    
    const deltaY = event.clientY - this.startY;
    const newHeight = this.startHeight + deltaY;
    this.sectionHeight = Math.max(100, Math.min(this.maxHeight, newHeight)); // Min 100px, Max 520px
  }

  stopResize() {
    this.isResizing = false;
  }

  currentTab: string = '';

  initializeTabSystem(): void {
    const btnprojet1 = document.getElementById('tab-btn-projet1');
    const btnprojet2 = document.getElementById('tab-btn-projet2');
    const tabprojet1 = document.getElementById('tab-section-projet1');
    const tabprojet2 = document.getElementById('tab-section-projet2');
    const line1pauseprojet1 = document.getElementById('line1projet1');
    const line2pauseprojet1 = document.getElementById('line2projet1');
    const line1pauseprojet2 = document.getElementById('line1projet2');
    const line2pauseprojet2 = document.getElementById('line2projet2');

    if (!tabprojet1 || !tabprojet2 || !btnprojet1 || !btnprojet2 || !line1pauseprojet1 || !line2pauseprojet1 || !line1pauseprojet2 || !line2pauseprojet2) {
      console.error('Elements not found');
      return;
    }

    tabprojet2.style.display = 'none';
    tabprojet1.style.display = 'none';
    line1pauseprojet1.style.display = 'none';
    line2pauseprojet1.style.display = 'none';
    line1pauseprojet2.style.display = 'none';
    line2pauseprojet2.style.display = 'none';
  }

  switchToTab(tabName: string): void {
    const tabprojet1 = document.getElementById('tab-section-projet1');
    const tabprojet2 = document.getElementById('tab-section-projet2');
    const btnprojet1 = document.getElementById('tab-btn-projet1');
    const btnprojet2 = document.getElementById('tab-btn-projet2');
    const line1pauseprojet1 = document.getElementById('line1projet1');
    const line2pauseprojet1 = document.getElementById('line2projet1');
    const line1pauseprojet2 = document.getElementById('line1projet2');
    const line2pauseprojet2 = document.getElementById('line2projet2');
    const imgTechmybro = document.getElementById('imgTechmybro');
    const imgACF2L = document.getElementById('imgACF2L');

    if (!tabprojet1 || !tabprojet2 || !btnprojet1 || !btnprojet2 || !line1pauseprojet1 || !line2pauseprojet1 || !line1pauseprojet2 || !line2pauseprojet2 || !imgTechmybro || !imgACF2L) return;

    if (tabName === 'projet1') {
      tabprojet2.style.display = 'none';
      tabprojet1.style.display = 'block';

      btnprojet2.style.display = 'block';
      line1pauseprojet2.style.display = 'none';
      line2pauseprojet2.style.display = 'none';
      btnprojet1.style.display = 'none';
      line1pauseprojet1.style.display = 'block';
      line2pauseprojet1.style.display = 'block';
      imgTechmybro.style.transition = '5s';
      imgTechmybro.style.rotate = '360deg';

      this.currentTab = 'projet1';
    } else if (tabName === 'projet2') {
      tabprojet1.style.display = 'none';
      tabprojet2.style.display = 'block';

      btnprojet1.style.display = 'block';
      line1pauseprojet1.style.display = 'none';
      line2pauseprojet1.style.display = 'none';
      btnprojet2.style.display = 'none';
      line1pauseprojet2.style.display = 'block';
      line2pauseprojet2.style.display = 'block';
      imgACF2L.style.transition = '5s';
      imgACF2L.style.rotate = '360deg';

      this.currentTab = 'projet2';
    }
  }
}