export class Role {
  name: string;
  startDate: Date;
  endDate?: Date;
  contractType: string;

  constructor(name: string, startDate: Date, contractType: string, endDate?: Date) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.contractType = contractType;
  }
}