import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileSummaryComponent } from "./profile-summary/profile-summary.component";
import { WorkingExperienceComponent } from "./working-experience/working-experience.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileSummaryComponent, WorkingExperienceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'about-me';
}
