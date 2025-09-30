import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('blog-admin-spa');
}
