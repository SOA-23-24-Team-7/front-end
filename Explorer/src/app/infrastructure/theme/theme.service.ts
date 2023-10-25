import { Injectable } from '@angular/core';
import { THEME, THEME_LIGHT, THEME_DARK } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    const theme = this.getTheme();
    this.enableDarkTheme(theme);
  }

  getTheme(): string {
    const theme = localStorage.getItem(THEME);
    return theme  ? theme : THEME_LIGHT;
  }

  saveTheme(theme: string): void {
    localStorage.removeItem(THEME);
    localStorage.setItem(THEME, theme);
  }

  toggleTheme() {
    let theme = this.getTheme();
    theme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    this.saveTheme(theme);
    this.enableDarkTheme(theme);
  }

  enableDarkTheme(theme: string) {
    if (theme === THEME_DARK) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
