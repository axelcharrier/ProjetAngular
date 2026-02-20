import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToastModule, Footer],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ProjetAngular');
}
