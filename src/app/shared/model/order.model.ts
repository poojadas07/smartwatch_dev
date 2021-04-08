import {Id} from './common.model';

export class OrderModel implements Id {
  public id?: string;
  public orderNo: string;
  public orderDate: string;
  public num: number;
  public amount: number;
  public overWeightSurcharge: number;
  public freight: number;
  public discount: number;
  public payDiscount: number;
  public pay: string;
  public payDate: string;
  public address: string;
  public delivery: string;
  public deliveryPhone: string;
  public deliveryDate: string;
  public userId: string;
  public status: string;
  public date: string;
  public finishDate: string;
  public total: number;

  public userName?: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.orderNo = model.orderNo;
    this.orderDate = model.orderDate;
    this.num = model.num;
    this.amount = model.amount;
    this.overWeightSurcharge = model.overWeightSurcharge;
    this.freight = model.freight;
    this.discount = model.discount;
    this.payDiscount = model.payDiscount;
    this.pay = model.pay;
    this.payDate = model.payDate;
    this.address = model.address;
    this.delivery = model.delivery;
    this.deliveryPhone = model.deliveryPhone;
    this.deliveryDate = model.deliveryDate;
    this.userId = model.userId;
    this.status = model.status;
    this.date = model.date;
    this.finishDate = model.finishDate;
    this.total = model.total;
  }
}

