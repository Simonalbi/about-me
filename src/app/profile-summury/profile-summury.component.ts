import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-summury',
  standalone: true,
  imports: [],
  providers: [DatePipe],
  templateUrl: './profile-summury.component.html',
  styleUrl: './profile-summury.component.css'
})
export class ProfileSummuryComponent {
  private bornDate: Date = new Date(2003, 11, 6);

  constructor(private datePipe: DatePipe) {}

  get birthday(): string {
    return this.datePipe.transform(this.bornDate, 'd MMM y')!;
  }

  get age(): number {
    const now = new Date();
    return now.getFullYear() - this.bornDate.getFullYear();
  }
}
