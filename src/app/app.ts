import { Component, signal } from '@angular/core';
import { Nav } from './nav/nav';
import { Footer } from "./footer/footer";
import { UserMain } from './user-main/user-main';

@Component({
  selector: 'app-root',
  imports: [Nav, Footer, UserMain],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
