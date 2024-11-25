import { Role } from './role.model';

export class Company {
  readonly name: string;
  readonly logo: string;
  readonly location: string;
  readonly workMode: string;
  readonly roles: Array<Role>;

  constructor(name: string, logo: string, location: string, workMode: string, roles: Array<Role>) {
    this.name = name;
    this.logo = logo;
    this.location = location;
    this.workMode = workMode;

    this.roles = roles;
    this.roles.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  get absoluteStartDate(): Date {
    return this.roles[this.roles.length - 1].startDate;
  }

  get absoluteEndDate(): Date | null {
    return this.roles[0].endDate ?? null;
  }

  get companyPermanenceTime(): string {
    let endDate = this.roles[0].endDate;
    if (!endDate) {
      endDate = new Date();
    }

    let months = Math.abs(endDate.getMonth() - this.roles[this.roles.length - 1].startDate.getMonth());
    let years = Math.abs(endDate.getFullYear() - this.roles[this.roles.length - 1].startDate.getFullYear());

    months++;
    if (months === 12) {
      years++;
      months = 0;
    }

    let companyPermanenceTime = "";
    if (years > 0) {
      companyPermanenceTime += `${years} year`;
      if (years > 1) {
        companyPermanenceTime += "s";
      }
    }

    if (months > 0) {
      if (years > 0) {
        companyPermanenceTime += " and ";
      }

      companyPermanenceTime += `${months} month`;
      if (months > 1) {
        companyPermanenceTime += "s";
      }
    }

    return companyPermanenceTime;
  }
}