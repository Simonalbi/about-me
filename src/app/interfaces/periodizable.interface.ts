import {differenceInYears, differenceInMonths} from 'date-fns';

export abstract class Periodizable {
  abstract startDate: Date;
  abstract endDate?: Date;

  get periodString(): string {
    const endDate = this.endDate ?? new Date();
    const years = differenceInYears(endDate, this.startDate);
    const months = differenceInMonths(endDate, this.startDate) % 12;

    let period = "";
    if (years > 0) {
      period += `${years} year`;
      if (years > 1) {
        period += "s";
      }
    }

    if (months > 0) {
      if (years > 0) {
        period += " and ";
      }

      period += `${months} month`;
      if (months > 1) {
        period += "s";
      }
    }

    return period;
  }
}