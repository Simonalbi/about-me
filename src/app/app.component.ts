import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileSummuryComponent } from "./profile-summury/profile-summury.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileSummuryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'about-me';
}
