import { Component } from '@angular/core';

@Component({
  selector: 'app-testdrag',
  imports: [],
  templateUrl: './testdrag.html',
  styleUrl: './testdrag.css',
})
export class Testdrag {
  sectionHeight = 300;
  isResizing = false;
  startY = 0;
  startHeight = 0;

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
    this.sectionHeight = Math.max(100, this.startHeight + deltaY); // Min 100px
  }

  stopResize() {
    this.isResizing = false;
  }
}