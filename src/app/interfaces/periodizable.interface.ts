export abstract class Periodizable {
  abstract startDate: Date;
  abstract endDate?: Date;

  get periodString(): string {
    const currentPeriodEndDate = new Date();
    currentPeriodEndDate.setMonth(currentPeriodEndDate.getMonth() + 1);

    const endDate = this.endDate ?? currentPeriodEndDate;
    let months = Math.abs(endDate.getMonth() - this.startDate.getMonth());
    let years = Math.abs(endDate.getFullYear() - this.startDate.getFullYear());

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