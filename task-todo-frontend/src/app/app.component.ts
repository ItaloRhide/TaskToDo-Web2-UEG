import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // carrega preferência salva
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme === 'true') {
      this.enableDarkMode(true);
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.enableDarkMode(this.isDarkMode);
    localStorage.setItem('dark-mode', this.isDarkMode.toString());
  }

  private enableDarkMode(enable: boolean): void {
    if (enable) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }
}
