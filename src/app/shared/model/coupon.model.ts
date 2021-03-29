import {Id} from './common.model';

export class CouponModel implements Id {

  public id?: string;
  public name: string;
  public beginDate: string;
  public endDate: string;
  public desc: string;
  public date: string;
  public sort: number;
  public amount: number;
  public enable: boolean;
  public discountAmount: number;
  countryId: any;
  regionId: any;
  locationId: any;
  clientId: any;
  public countryName: string;
  public regionName: string;
  public phoneNo: string;
  public address: string;
  departmentId: string;
  public departmentName: String;
  public clientName: String;
  public locationName: String;
  screenId: string;
  rowNo: any;
  colNo: any;
  operatorId: string;
  region: any;
  country: any;
  panelId: string;
  sensorId: any;

  constructor(model: any = {}) {
    this.id = model.id;
    this.beginDate = model.beginDate;
    this.endDate = model.endDate;
    this.desc = model.desc;
    this.name = model.name;
    this.countryName = model.countryName;
    this.sort = model.sort;
    this.amount = model.amount;
    this.date = model.date;
    this.enable = model.enable;
    this.discountAmount = model.discountAmount;
  }
}
