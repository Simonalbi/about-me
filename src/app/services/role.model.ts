export class Role {
  readonly name: string;
  readonly startDate: Date;
  readonly endDate?: Date;
  readonly contractType: string;

  constructor(name: string, startDate: Date, contractType: string, endDate?: Date) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.contractType = contractType;
  }
}