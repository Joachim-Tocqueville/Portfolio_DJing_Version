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
    
    // Ajouter un setTimeout pour s'assurer que le DOM est prêt
    setTimeout(() => {
      this.initializeTabSystem();
      this.setupAnchorLinks();
    }, 0);

    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isAnchorLink = target.closest('a[href^="#"]');
      
      if (!isAnchorLink && this.currentSelectedElement) {
        this.currentSelectedElement.style.color = '';
        this.currentSelectedElement.classList.remove('selected');
        this.currentSelectedElement = null;
      }
    });

    document.addEventListener('mousemove', (e: MouseEvent) => {
      this.onFaderMouseMove(e);
    });
    
    document.addEventListener('mouseup', () => {
      this.stopFaderDrag();
    });
  }

  private setupAnchorLinks(): void {
    const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e: MouseEvent) => {
        const href = link.getAttribute('href');

        if (!href) return;

        const targetId = href.substring(1);

        e.preventDefault();

        if (targetId.endsWith('1')) {
          this.switchToTab('projet1');
        }

        if (targetId.endsWith('2')) {
          this.switchToTab('projet2');
        }

        if (targetId.endsWith('3')) {
          this.switchToTab('projet3');
        }
        
        if (targetId.endsWith('4')) {
          this.switchToTab('projet4');
        }

        setTimeout(() => {
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            
            // Enlever la couleur rouge de l'élément précédemment sélectionné
            if (this.currentSelectedElement && this.currentSelectedElement !== targetElement) {
              this.currentSelectedElement.style.color = '';
              this.currentSelectedElement.classList.remove('selected');
            }

            // Appliquer la couleur rouge au nouvel élément sélectionné
            if (!targetElement.classList.contains('selected')) {
              targetElement.style.color = 'red';
              targetElement.classList.add('selected');
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
        }, 50);
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
    const btnprojet3 = document.getElementById('tab-btn-projet3');
    const btnprojet4 = document.getElementById('tab-btn-projet4');
    const tabprojet1 = document.getElementById('tab-section-projet1');
    const tabprojet2 = document.getElementById('tab-section-projet2');
    const tabprojet3 = document.getElementById('tab-section-projet3');
    const tabprojet4 = document.getElementById('tab-section-projet4');
    const line1pauseprojet1 = document.getElementById('line1projet1');
    const line2pauseprojet1 = document.getElementById('line2projet1');
    const line1pauseprojet2 = document.getElementById('line1projet2');
    const line2pauseprojet2 = document.getElementById('line2projet2');
    const line1pauseprojet3 = document.getElementById('line1projet3');
    const line2pauseprojet3 = document.getElementById('line2projet3');
    const line1pauseprojet4 = document.getElementById('line1projet4');
    const line2pauseprojet4 = document.getElementById('line2projet4');

    if (!tabprojet1 || !tabprojet2 || !tabprojet3 || !tabprojet4 || !btnprojet1 || !btnprojet2 || !btnprojet3 || !btnprojet4 || !line1pauseprojet1 || !line2pauseprojet1 || !line1pauseprojet2 || !line2pauseprojet2 || !line1pauseprojet3 || !line2pauseprojet3 || !line1pauseprojet4 || !line2pauseprojet4) {
      console.error('Elements not found');
      return;
    }

    // Cacher les sections au démarrage
    tabprojet1.style.display = 'none';
    tabprojet2.style.display = 'none';
    tabprojet3.style.display = 'none';
    tabprojet4.style.display = 'none';

    // Afficher les boutons et cacher les lignes de pause
    btnprojet1.style.display = 'block';
    btnprojet2.style.display = 'block';
    btnprojet3.style.display = 'none';
    btnprojet4.style.display = 'none';
    line1pauseprojet1.style.display = 'none';
    line2pauseprojet1.style.display = 'none';
    line1pauseprojet2.style.display = 'none';
    line2pauseprojet2.style.display = 'none';
    line1pauseprojet3.style.display = 'none';
    line2pauseprojet3.style.display = 'none';
    line1pauseprojet4.style.display = 'none';
    line2pauseprojet4.style.display = 'none';
  }

  switchToTab(tabName: string): void {
    console.log('switchToTab appelé avec:', tabName);
    const btnprojet1 = document.getElementById('tab-btn-projet1');
    const btnprojet2 = document.getElementById('tab-btn-projet2');
    const btnprojet3 = document.getElementById('tab-btn-projet3');
    const btnprojet4 = document.getElementById('tab-btn-projet4');
    const tabprojet1 = document.getElementById('tab-section-projet1');
    const tabprojet2 = document.getElementById('tab-section-projet2');
    const tabprojet3 = document.getElementById('tab-section-projet3');
    const tabprojet4 = document.getElementById('tab-section-projet4');
    const line1pauseprojet1 = document.getElementById('line1projet1');
    const line2pauseprojet1 = document.getElementById('line2projet1');
    const line1pauseprojet2 = document.getElementById('line1projet2');
    const line2pauseprojet2 = document.getElementById('line2projet2');
    const line1pauseprojet3 = document.getElementById('line1projet3');
    const line2pauseprojet3 = document.getElementById('line2projet3');
    const line1pauseprojet4 = document.getElementById('line1projet4');
    const line2pauseprojet4 = document.getElementById('line2projet4');
    const imgTechmybro = document.getElementById('imgTechmybro');
    const imgACF2L = document.getElementById('imgACF2L');
    const imgSitetouristique = document.getElementById('imgSitetouristique');
    const imgWebdocsansaffiches = document.getElementById('imgWebdocsansaffiches');

    if (!tabprojet1 || !tabprojet2 || !tabprojet3 || !tabprojet4 || !btnprojet1 || !btnprojet2 || !btnprojet3 || !btnprojet4 || !line1pauseprojet1 || !line2pauseprojet1 || !line1pauseprojet2 || !line2pauseprojet2 || !line1pauseprojet3 || !line2pauseprojet3 || !line1pauseprojet4 || !line2pauseprojet4 || !imgTechmybro || !imgACF2L || !imgSitetouristique || !imgWebdocsansaffiches) return;

    if (tabName === 'projet1') {
      tabprojet1.style.display = 'block';
      tabprojet2.style.display = 'none';
      tabprojet3.style.display = 'none';
      tabprojet4.style.display = 'none';

      // Projet 1 : mode "lecture" (pause visible, play caché, animation active)
      line1pauseprojet1.style.display = 'block';
      line2pauseprojet1.style.display = 'block';
      btnprojet1.style.display = 'none';
      imgTechmybro.classList.add('rotating'); // Utiliser une classe

      // Projet 2 : mode "arrêt" (play visible, pause cachée, animation arrêtée)
      line1pauseprojet2.style.display = 'none';
      line2pauseprojet2.style.display = 'none';
      btnprojet2.style.display = 'block';
      imgACF2L.classList.remove('rotating'); // Retirer la classe

      this.currentTab = 'projet1';
      console.log('Switched to projet1, animation lancée');
    }
    
    if (tabName === 'projet2') {
      tabprojet2.style.display = 'block';
      tabprojet1.style.display = 'none';
      tabprojet3.style.display = 'none';
      tabprojet4.style.display = 'none';

      // Projet 2 : mode "lecture" (pause visible, play caché, animation active)
      line1pauseprojet2.style.display = 'block';
      line2pauseprojet2.style.display = 'block';
      btnprojet2.style.display = 'none';
      imgACF2L.classList.add('rotating'); // Utiliser une classe

      // Projet 1 : mode "arrêt" (play visible, pause cachée, animation arrêtée)
      line1pauseprojet1.style.display = 'none';
      line2pauseprojet1.style.display = 'none';
      btnprojet1.style.display = 'block';
      imgTechmybro.classList.remove('rotating'); // Retirer la classe

      this.currentTab = 'projet2';
      console.log('Switched to projet2, animation lancée');
    }

    if (tabName === 'projet3') {
      tabprojet3.style.display = 'block';
      tabprojet1.style.display = 'none';
      tabprojet2.style.display = 'none';
      tabprojet4.style.display = 'none';

      // Projet 3 : mode "lecture" (pause visible, play caché, animation active)
      line1pauseprojet3.style.display = 'block';
      line2pauseprojet3.style.display = 'block';
      btnprojet3.style.display = 'none';
      imgSitetouristique.classList.add('rotating'); // Utiliser une classe

      // Projet 4 : mode "arrêt" (play visible, pause cachée, animation arrêtée)
      line1pauseprojet4.style.display = 'none';
      line2pauseprojet4.style.display = 'none';
      btnprojet4.style.display = 'block';
      imgWebdocsansaffiches.classList.remove('rotating'); // Retirer la classe

      this.currentTab = 'projet3';
      console.log('Switched to projet3, animation lancée');
    }
    
    if (tabName === 'projet4') {
      tabprojet4.style.display = 'block';
      tabprojet1.style.display = 'none';
      tabprojet2.style.display = 'none';
      tabprojet3.style.display = 'none';

      // Projet 4 : mode "lecture" (pause visible, play caché, animation active)
      line1pauseprojet4.style.display = 'block';
      line2pauseprojet4.style.display = 'block';
      btnprojet4.style.display = 'none';
      imgWebdocsansaffiches.classList.add('rotating'); // Utiliser une classe

      // Projet 3 : mode "arrêt" (play visible, pause cachée, animation arrêtée)
      line1pauseprojet3.style.display = 'none';
      line2pauseprojet3.style.display = 'none';
      btnprojet3.style.display = 'block';
      imgSitetouristique.classList.remove('rotating'); // Retirer la classe

      this.currentTab = 'projet4';
      console.log('Switched to projet4, animation lancée');
    }
  }

  imageURL: string = '/imgs/Page_accueil_webdoc_sans_affiches.webp';
  imagealt: string = "Image de 'Page d'accueil du webdoc sans les affiches'";

  changeImage(isHovering: boolean): void {
    this.imageURL = isHovering ? '/imgs/Page_accueil_webdoc_avec_affiches.webp' : '/imgs/Page_accueil_webdoc_sans_affiches.webp';
    this.imagealt = isHovering ? "Image de 'Page d'accueil du webdoc avec les affiches'" : "Image de 'Page d'accueil du webdoc sans les affiches'"
  }

  changePlayPause(event: MouseEvent): void {
    const line1p1 = document.getElementById('line1projet1');
    const line2p1 = document.getElementById('line2projet1');
    const line1p2 = document.getElementById('line1projet2');
    const line2p2 = document.getElementById('line2projet2');
    const line1p3 = document.getElementById('line1projet3');
    const line2p3 = document.getElementById('line2projet3');
    const line1p4 = document.getElementById('line1projet4');
    const line2p4 = document.getElementById('line2projet4');
    const btn1 = document.getElementById('tab-btn-projet1');
    const btn2 = document.getElementById('tab-btn-projet2');
    const btn3 = document.getElementById('tab-btn-projet3');
    const btn4 = document.getElementById('tab-btn-projet4');
    const img1 = document.getElementById('imgTechmybro') as HTMLElement;
    const img2 = document.getElementById('imgACF2L') as HTMLElement;
    const img3 = document.getElementById('imgSitetouristique') as HTMLElement;
    const img4 = document.getElementById('imgWebdocsansaffiches') as HTMLElement;
    const tabprojet1 = document.getElementById('tab-section-projet1');
    const tabprojet2 = document.getElementById('tab-section-projet2');
    const tabprojet3 = document.getElementById('tab-section-projet3');
    const tabprojet4 = document.getElementById('tab-section-projet4');

    if (!line1p1 || !line2p1 || !line1p2 || !line2p2 || !line1p3 || !line2p3 || !line1p4 || !line2p4 || !btn1 || !btn2 || !btn3 || !btn4 || !tabprojet1 || !tabprojet2 || !tabprojet3 || !tabprojet4) return;

    const target = event.target as HTMLElement;

    // Déterminer quel projet a été cliqué (ligne ou bouton)
    const clickedProjet1 = !!target.closest('#line1projet1') || !!target.closest('#line2projet1') || !!target.closest('#tab-btn-projet1') || !!target.closest('#hitPlayProjet1');
    const clickedProjet2 = !!target.closest('#line1projet2') || !!target.closest('#line2projet2') || !!target.closest('#tab-btn-projet2') || !!target.closest('#hitPlayProjet2');
    const clickedProjet3 = !!target.closest('#line1projet3') || !!target.closest('#line2projet3') || !!target.closest('#tab-btn-projet3') || !!target.closest('#hitPlayProjet3');
    const clickedProjet4 = !!target.closest('#line1projet4') || !!target.closest('#line2projet4') || !!target.closest('#tab-btn-projet4') || !!target.closest('#hitPlayProjet4');

    if (clickedProjet1) {
      const visible = getComputedStyle(line1p1).display !== 'none';
      if (visible) {
        // actuellement en "pause" visuel -> arrêter la rotation et afficher bouton play
        // PAUSE : Arrêter et garder la position actuelle
        console.log('PAUSE projet 1');
        if (img1) {
          const currentRotation = this.getCurrentRotation(img1);
          console.log('Rotation actuelle:', currentRotation);
          img1.style.animation = 'none';
          img1.style.transform = `rotate(${currentRotation}deg)`;
        }
        line1p1.style.display = 'none';
        line2p1.style.display = 'none';
        btn1.style.display = 'block';
      } else {
        // PLAY : Reprendre l'animation depuis la position actuelle
        console.log('PLAY projet 1');

        // Afficher la section projet 1
        tabprojet1.style.display = 'block';
        tabprojet2.style.display = 'none';
        tabprojet3.style.display = 'none';
        tabprojet4.style.display = 'none';
        
        // Arrêter l'autre projet
        if (img2) {
          img2.style.animation = 'none';
        }
        line1p2.style.display = 'none';
        line2p2.style.display = 'none';
        btn2.style.display = 'block';
        line1p3.style.display = 'none';
        line2p3.style.display = 'none';
        btn3.style.display = 'none';
        line1p4.style.display = 'none';
        line2p4.style.display = 'none';
        btn4.style.display = 'none';
        
        if (img1) {
          const currentRotation = this.getCurrentRotation(img1);
          console.log('Reprise depuis:', currentRotation);
          // Créer une animation qui commence à l'angle actuel
          img1.style.animation = 'none';
          img1.style.transform = `rotate(${currentRotation}deg)`;
          // Forcer un reflow pour que le changement soit pris en compte
          void img1.offsetHeight;
          img1.style.animation = 'spin 5s linear infinite';
        }
        // lancer la rotation et afficher les deux lignes (pause)
        this.switchToTab('projet1');
        line1p1.style.display = 'block';
        line2p1.style.display = 'block';
        btn1.style.display = 'none';
      }
      return;
    }

    if (clickedProjet2) {
      const visible = getComputedStyle(line1p2).display !== 'none';
      if (visible) {
        // PAUSE : Arrêter et garder la position actuelle
        console.log('PAUSE projet 2');
        if (img2) {
          const currentRotation = this.getCurrentRotation(img2);
          console.log('Rotation actuelle:', currentRotation);
          img2.style.animation = 'none';
          img2.style.transform = `rotate(${currentRotation}deg)`;
        }
        line1p2.style.display = 'none';
        line2p2.style.display = 'none';
        btn2.style.display = 'block';
      } else {
        // PLAY : Reprendre l'animation depuis la position actuelle
        console.log('PLAY projet 2');

        // Afficher la section projet 2
        tabprojet2.style.display = 'block';
        tabprojet1.style.display = 'none';
        tabprojet3.style.display = 'none';
        tabprojet4.style.display = 'none';
        
        // Arrêter l'autre projet
        if (img1) {
          img1.style.animation = 'none';
        }
        line1p1.style.display = 'none';
        line2p1.style.display = 'none';
        btn1.style.display = 'block';
        line1p3.style.display = 'none';
        line2p3.style.display = 'none';
        btn3.style.display = 'none';
        line1p4.style.display = 'none';
        line2p4.style.display = 'none';
        btn4.style.display = 'none';

        if (img2) {
          const currentRotation = this.getCurrentRotation(img2);
          console.log('Reprise depuis:', currentRotation);
          img2.style.animation = 'none';
          img2.style.transform = `rotate(${currentRotation}deg)`;
          void img2.offsetHeight;
          img2.style.animation = 'spin 5s linear infinite';
        }
        this.switchToTab('projet2');
        line1p2.style.display = 'block';
        line2p2.style.display = 'block';
        btn2.style.display = 'none';
      }
      return;
    }

    if (clickedProjet3) {
      const visible = getComputedStyle(line1p3).display !== 'none';
      if (visible) {
        // actuellement en "pause" visuel -> arrêter la rotation et afficher bouton play
        // PAUSE : Arrêter et garder la position actuelle
        console.log('PAUSE projet 3');
        if (img3) {
          const currentRotation = this.getCurrentRotation(img1);
          console.log('Rotation actuelle:', currentRotation);
          img3.style.animation = 'none';
          img3.style.transform = `rotate(${currentRotation}deg)`;
        }
        line1p3.style.display = 'none';
        line2p3.style.display = 'none';
        btn3.style.display = 'block';
      } else {
        // PLAY : Reprendre l'animation depuis la position actuelle
        console.log('PLAY projet 3');

        // Afficher la section projet 3
        tabprojet3.style.display = 'block';
        tabprojet1.style.display = 'none';
        tabprojet2.style.display = 'none';
        tabprojet4.style.display = 'none';
        
        // Arrêter l'autre projet
        if (img4) {
          img4.style.animation = 'none';
        }
        line1p4.style.display = 'none';
        line2p4.style.display = 'none';
        btn3.style.display = 'block';
        line1p1.style.display = 'none';
        line2p1.style.display = 'none';
        btn1.style.display = 'none';
        line1p2.style.display = 'none';
        line2p2.style.display = 'none';
        btn2.style.display = 'none';
        
        if (img3) {
          const currentRotation = this.getCurrentRotation(img1);
          console.log('Reprise depuis:', currentRotation);
          // Créer une animation qui commence à l'angle actuel
          img3.style.animation = 'none';
          img3.style.transform = `rotate(${currentRotation}deg)`;
          // Forcer un reflow pour que le changement soit pris en compte
          void img2.offsetHeight;
          img3.style.animation = 'spin 5s linear infinite';
        }
        // lancer la rotation et afficher les deux lignes (pause)
        this.switchToTab('projet3');
        line1p3.style.display = 'block';
        line2p3.style.display = 'block';
        btn3.style.display = 'none';
      }
      return;
    }

    if (clickedProjet4) {
      const visible = getComputedStyle(line1p4).display !== 'none';
      if (visible) {
        // PAUSE : Arrêter et garder la position actuelle
        console.log('PAUSE projet 4');
        if (img4) {
          const currentRotation = this.getCurrentRotation(img2);
          console.log('Rotation actuelle:', currentRotation);
          img4.style.animation = 'none';
          img4.style.transform = `rotate(${currentRotation}deg)`;
        }
        line1p4.style.display = 'none';
        line2p4.style.display = 'none';
        btn4.style.display = 'block';
      } else {
        // PLAY : Reprendre l'animation depuis la position actuelle
        console.log('PLAY projet 4');

        // Afficher la section projet 4
        tabprojet4.style.display = 'block';
        tabprojet1.style.display = 'none';
        tabprojet2.style.display = 'none';
        tabprojet3.style.display = 'none';
        
        // Arrêter l'autre projet
        if (img3) {
          img3.style.animation = 'none';
        }
        line1p3.style.display = 'none';
        line2p3.style.display = 'none';
        btn4.style.display = 'block';
        line1p1.style.display = 'none';
        line2p1.style.display = 'none';
        btn1.style.display = 'none';
        line1p2.style.display = 'none';
        line2p2.style.display = 'none';
        btn2.style.display = 'none';

        if (img4) {
          const currentRotation = this.getCurrentRotation(img2);
          console.log('Reprise depuis:', currentRotation);
          img4.style.animation = 'none';
          img4.style.transform = `rotate(${currentRotation}deg)`;
          void img4.offsetHeight;
          img4.style.animation = 'spin 5s linear infinite';
        }
        this.switchToTab('projet4');
        line1p4.style.display = 'block';
        line2p4.style.display = 'block';
        btn4.style.display = 'none';
      }
      return;
    }
  }

  private getCurrentRotation(element: HTMLElement): number {
    const style = window.getComputedStyle(element);
    const transform = style.transform;
    
    if (transform === 'none') {
      return 0;
    }
    
    // Extraire la matrice de transformation
    const values = transform.split('(')[1].split(')')[0].split(',');
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    
    // Calculer l'angle en degrés
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    
    // Normaliser l'angle entre 0 et 360
    if (angle < 0) {
      angle += 360;
    }
    
    return angle;
  }

  private isDraggingFader = false;
  private faderStartX = 0;
  private faderStartLeft = 0;
  private readonly FADER_MIN = -3.01;
  private readonly FADER_MILIEU = 0;
  private readonly FADER_MAX = 3.1;

  startFaderDrag(event: MouseEvent) {
    this.isDraggingFader = true;
    this.faderStartX = event.clientX;
    
    const fader = document.getElementById('fader_movible');
    if (!fader) return;
    
    const currentMarginStr = fader.style.marginLeft || '0rem';
    this.faderStartLeft = parseFloat(currentMarginStr);
    
    event.preventDefault();
  }

  onFaderMouseMove(event: MouseEvent) {
    if (!this.isDraggingFader) return;
    
    const fader = document.getElementById('fader_movible');
    if (!fader) return;

    const deltaX = event.clientX - this.faderStartX;

    const deltaRem = deltaX / 16;

    let newLeft = this.faderStartLeft + deltaRem;
    
    newLeft = Math.max(this.FADER_MIN, Math.min(this.FADER_MAX, newLeft));
    
    fader.style.marginLeft = `${newLeft}rem`;
    
    this.changeProjets(newLeft);
  }

  stopFaderDrag() {
    if (!this.isDraggingFader) return;
    
    this.isDraggingFader = false;
    
    const fader = document.getElementById('fader_movible');
    if (!fader) return;
  }

  private changeProjets(faderPosition: number) {
    const projet1 = document.getElementById('projet1');
    const projet2 = document.getElementById('projet2');
    const projet3 = document.getElementById('projet3');
    const projet4 = document.getElementById('projet4');

    if (!projet1 || !projet2 || !projet3 || !projet4) return;

    const midPoint = this.FADER_MILIEU;

    if (faderPosition < midPoint) {
      projet1.classList.remove('hidden');
      projet2.classList.remove('hidden');
      projet3.classList.add('hidden');
      projet4.classList.add('hidden');
    } else {
      projet1.classList.add('hidden');
      projet2.classList.add('hidden');
      projet3.classList.remove('hidden');
      projet4.classList.remove('hidden');
    }
  }
}