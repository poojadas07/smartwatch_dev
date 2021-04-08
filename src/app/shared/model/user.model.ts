import {Id} from './common.model';

export class UserModel implements Id {
  public id?: string;
  public uid: string;
  public userId: string;
  public fullName: string;
  public name?: string;
  public email: string;
  public phoneNo: string;
  public photoURL: string;
  public role: string;
  public registerDate: string;
  public lastDate: string;
  public balance: number;

  constructor(model: any = {}) {
    this.id = model.id;
    this.uid = model.uid;
    this.name = model.displayName;
    this.email = model.email;
    this.photoURL = model.photoURL;
    this.lastDate = model.lastDate;
    this.registerDate = model.registerDate;
    this.balance = model.balance;
  }
}
