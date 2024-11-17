import { Role } from './role.model';

export class Company {
  name: string;
  logo: string;
  location: string;
  workMode: string;
  roles: Array<Role>;

  constructor(name: string, logo: string, location: string, workMode: string, roles: Array<Role>) {
    this.name = name;
    this.logo = logo;
    this.location = location;
    this.workMode = workMode;
    this.roles = roles;
  }
}