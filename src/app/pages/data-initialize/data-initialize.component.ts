import {Component, OnInit} from '@angular/core';
import {combineLatest, forkJoin, from, Observable} from 'rxjs';
import {BaseService} from '../../shared/services/firebase-api/base.service';
import {DatePipe} from '@angular/common';
import {
  DataInitializeModel,
  PayModel,
  DataInitService,
  PayService,
  ModalService,
  NoticeModel,
  NoticeService,
  BannerService,
  BannerModel,
  CouponsService,
  CouponModel,
  DeliveryModel,
  DeliveryService,
  OrderService,
  GoodsService,
  OrderDetailService,
  OwsService,
  CateService,
  SubCateService,
  CateModel,
  SubCateModel,
  OrderModel,
  OrderDetailModel,
  OwsModel,
  GoodsModel,
  ConfigModel, CateRelationModel, CateRelationService, Id, AuthService
} from '../../shared';
import {switchMap, timeout} from 'rxjs/operators';


@Component({
  selector: 'app-data-initialize',
  templateUrl: './data-initialize.component.html',
  styleUrls: ['./data-initialize.component.scss']
})
export class DataInitializeComponent implements OnInit {
  loading = false;
  dataList: Array<DataInitializeModel> = [
    {sort: 1, tableName: 'banner', isInit: false},
    {sort: 2, tableName: 'notice', isInit: false},
    {sort: 3, tableName: 'coupon', isInit: false},
    {sort: 4, tableName: 'express', isInit: false},
    {sort: 5, tableName: 'ows', isInit: false},
    {sort: 5, tableName: 'pays', isInit: false},
    {sort: 6, tableName: 'cate', isInit: false},
    {sort: 7, tableName: 'subcate', isInit: false},
    {sort: 8, tableName: 'caterelation', isInit: false},
    {sort: 9, tableName: 'product', isInit: false},
    {sort: 10, tableName: 'order', isInit: false}
  ];
  cateList: Array<CateModel>;
  subList: Array<SubCateModel>;
  productList: Array<GoodsModel>;

  constructor(private modalService: ModalService,
              private datePipe: DatePipe,
              private payService: PayService,
              private couponService: CouponsService,
              private bannerService: BannerService,
              private noticeService: NoticeService,
              private deliveryService: DeliveryService,
              private goodsService: GoodsService,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private cateRelationService: CateRelationService,
              private owsService: OwsService,
              private authService: AuthService,
              private cateService: CateService,
              private subCateService: SubCateService,
              private dataInitService: DataInitService) {

  }

  ngOnInit(): void {
  }

  onInit(model: DataInitializeModel): void {
    if (ConfigModel.isTest) {
      this.modalService.error(ConfigModel.testInfo);
      return;
    }

    if (model.tableName === 'banner') {
      this.addBanner();
    }
    if (model.tableName === 'coupon') {
      this.addCoupon();
    }
    if (model.tableName === 'notice') {
      this.addNotice();
    }
    if (model.tableName === 'pays') {
      this.addPay();
    }
    if (model.tableName === 'express') {
      this.addExpress();
    }
    if (model.tableName === 'ows') {
      this.addOws();
    }
    if (model.tableName === 'cate') {
      this.addCate();
    }
    if (model.tableName === 'subcate') {
      this.addSubCate();
    }
    if (model.tableName === 'caterelation') {
      this.addCateRelation();
    }
    if (model.tableName === 'product') {
      this.addProduct();
    }
    if (model.tableName === 'order') {
      this.addOrderList();
    }
    model.isInit = true;
  }

  private addBanner(): void {
    this.addModel<BannerModel>(this.dataInitService.getBannerList(), this.bannerService);
  }

  private addNotice(): void {
    this.addModel<NoticeModel>(this.dataInitService.getNoticeList(), this.noticeService);
  }

  private addCoupon(): void {
    this.addModel<CouponModel>(this.dataInitService.getDiscountList(), this.couponService);
  }

  private addPay(): void {
    this.addModel<PayModel>(this.dataInitService.getPayList(), this.payService);
  }


  private addExpress(): void {
    this.addModel<DeliveryModel>(this.dataInitService.getExpressList(), this.deliveryService);
  }

  private addCate(): void {
    this.addModel<CateModel>(this.dataInitService.getCateList(), this.cateService);
  }

  private addSubCate(): void {
    this.addModel<SubCateModel>(this.dataInitService.getSubCateList(), this.subCateService);
  }

  private addCateRelation(): void {
    this.loading = true;
    combineLatest([this.cateService.getList(),
      this.subCateService.getList()]).subscribe(results => {
      this.cateList = results[0] as Array<CateModel>;
      this.subList = results[1] as Array<SubCateModel>;
      const list = [];
      this.cateList.map(cate => {
        for (let i = 0; i < 6; i++) {
          const index = Math.ceil(Math.random() * (this.subList.length - 1));
          const model = new CateRelationModel({cateId: cate.id, subCateId: this.subList[index].id});
          list.push(this.cateRelationService.addModel(model));
        }
      });
      forkJoin(list).subscribe(r => {
        this.loading = false;
        this.modalService.success('success');
      });
    }, error => {
      this.loading = false;
      this.modalService.error(error);
    });
  }

  private addOws(): void {
    this.addModel<OwsModel>(this.dataInitService.getOwsList(), this.owsService);
  }

  private addProduct(): void {
    this.loading = true;
    combineLatest([this.dataInitService.getProductList(), this.subCateService.getList()]).subscribe(results => {
      this.productList = results[0] as Array<GoodsModel>;
      this.subList = results[1] as Array<SubCateModel>;
      const list = [];
      this.productList.map(p => {
        delete p.id;
        const subModel = this.subList.find(sub => p.cateName === sub.name);
        p.subCateId = subModel.id;
        p.cateName = subModel.name;
        list.push(this.goodsService.addModel(p));
      });
      forkJoin(list).subscribe(r => {
        this.loading = false;
        this.modalService.success('success');
      });
    });
  }

  private addOrderList(): void {
    this.loading = true;
    const list = Array.from({length: 30}, (v, i) => i).map(a => this.addOrder());
    forkJoin(list).subscribe(r => {
      this.loading = false;
      this.modalService.success('success');
    }, error => {
      this.loading = false;
      this.modalService.error(error);
    });
  }

  private addOrder(): void {
    return this.goodsService.getList().pipe(
      switchMap((goods: Array<GoodsModel>) => {
        const list = this.generateOrderDetailList('$orderId$', goods);
        const order = this.generateOrder(list);
        return from(this.orderService.addModel(order)).pipe(switchMap(orderResult => {
          list.forEach(d => d.orderId = orderResult.id);
          return list.map(d => this.orderDetailService.addModel(d));
        }));
      }),
      timeout(1000 * 30)
    );
  }

  private generateOrder(gList: Array<OrderDetailModel>): OrderModel {
    const statusArray = ['start', 'process', 'delivery', 'finish', 'cancel'];
    const orderModel = new OrderModel();
    orderModel.orderNo = new Date().getTime().toString();
    orderModel.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    orderModel.num = gList.map(g => g.num).reduce((p, c) => p + c, 0);
    orderModel.amount = gList.map(g => g.num * g.detailPrice).reduce((p, c) => p + c, 0);
    orderModel.userId = this.authService.user.uid;
    orderModel.status = statusArray[Math.floor(Math.random() * statusArray.length)];
    orderModel.userName = this.authService.user.name;
    orderModel.address = `Chicago 1900 Green Street`;
    orderModel.delivery = 'UPS';
    orderModel.deliveryDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    orderModel.pay = 'Cash on Delivery';
    orderModel.payDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    orderModel.payDiscount = 0;
    orderModel.discount = 0;
    orderModel.freight = 0;
    orderModel.total = orderModel.amount + orderModel.discount + orderModel.freight;
    return orderModel;
  }

  private generateOrderDetailList(orderId: string, goodList: Array<GoodsModel>): Array<OrderDetailModel> {
    const detailList = [];
    const nums = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < nums; i++) {
      const good = goodList[Math.floor(Math.random() * goodList.length)];
      const num = Math.floor(Math.random() * 5) + 1;
      detailList.push(new OrderDetailModel(
        {orderId, goodId: good.id, num, detailPrice: good.price, amount: (good.price * num).toFixed(2)}));
    }
    return detailList;
  }


  private addModel<T extends Id>(obs: Observable<Array<T>>, baseService: BaseService<T>): void {
    this.loading = true;
    obs.subscribe(result => {
        const list = result.map(p => {
          if (p.hasOwnProperty('id')) {
            delete p.id;
          }
          return baseService.addModel(p);
        });
        forkJoin(list).subscribe(r => {
          this.loading = false;
          this.modalService.success('success');
        });
      },
      error => {
        this.loading = false;
        this.modalService.error(error);
      });
  }
}
