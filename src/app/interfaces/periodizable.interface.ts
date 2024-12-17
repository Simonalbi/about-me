export abstract class Periodizable {
  abstract startDate: Date;
  abstract endDate?: Date;

  get periodString(): string {
    let months = Math.abs((this.endDate ?? new Date()).getMonth() - this.startDate.getMonth());
    let years = Math.abs((this.endDate ?? new Date()).getFullYear() - this.startDate.getFullYear());

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