import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BarModel, ChartModel, GoodsModel, OrderDetailModel, OrderModel, UserModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {
  groupBy,
  map,
  mergeMap,
  switchMap,
  takeLast,
  toArray
} from 'rxjs/operators';
import {combineLatest, from, Observable, of} from 'rxjs';
import {uniq, sumBy} from 'lodash';
import {NzModalService} from 'ng-zorro-antd/modal';


@Injectable({providedIn: 'root'})
export class OrderService extends BaseService<OrderModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'orders', modalService);
  }


  getList1() {
    return this.db.collection<OrderModel>('orders').snapshotChanges()
      .pipe(
        switchMap(orders => {
          const orderIds = uniq(orders.map(o => o.payload.doc.id));
          const userIds = uniq(orders.map(o => o.payload.doc.data().userId));
          return combineLatest(
            of(orders.map(o => ({id: o.payload.doc.id, ...o.payload.doc.data()}))),
            combineLatest(
              orderIds.map(orderId =>
                this.db.collection<OrderDetailModel>('orderdetail',
                  ref => ref.where('orderId', '==', orderId))
                  .valueChanges().pipe(map(detail => detail[0]), mergeMap(detail => {
                  return this.db.doc<GoodsModel>(`/goods/${detail.goodId}`)
                    .valueChanges()
                    .pipe(map(g => ({...g, ...detail})));
                }))
              )
            ),
            combineLatest(
              userIds.map(userId =>
                this.db.doc<UserModel>(`/users/${userId}`)
                  .snapshotChanges().pipe(map(user => ({id: user.payload.id, ...user.payload.data()})))
              )
            ),
          );
        }),
        map(([orders, details, users]) => {
          return orders.map(order => {
            const user = users.find(u => u.id === order.userId);
            return {
              ...order,
              details: details.filter(d => d.orderId === order.id),
              userName: user ? user.name : ''
            };
          });
        })
      );
  }

  getOrderList() {
    return this.db.collection<OrderModel>('orders').snapshotChanges()
      .pipe(
        switchMap(orders => {
          const orderIds = uniq(orders.map(o => o.payload.doc.id));
          const userIds = uniq(orders.map(o => o.payload.doc.data().userId));
          if (orders.length > 0) {
            return combineLatest(
              of(orders.map(o => ({id: o.payload.doc.id, ...o.payload.doc.data()}))),
              combineLatest(
                orderIds.map(orderId =>
                  this.db.collection<OrderDetailModel>('orderdetail',
                    ref => ref.where('orderId', '==', orderId))
                    .valueChanges().pipe(mergeMap(detail => {
                    return combineLatest(detail.map(d => {
                      return this.db.doc<GoodsModel>(`/goods/${d.goodId}`)
                        .valueChanges()
                        .pipe(map(g => ({...d, ...g})));
                    }));
                  }))
                )
              ),
              combineLatest(
                userIds.map(userId =>
                  this.db.doc<UserModel>(`/users/${userId}`)
                    .snapshotChanges().pipe(map(user => ({id: user.payload.id, ...user.payload.data()})))
                )
              ),
            );
          } else {
            return of([], [], []);
          }

        }),
        map(([orders, details, users]) => {
          return orders ? orders.map(order => {
            const user = users.find(u => u.id === order.userId);
            return {
              ...order,
              details: details.map(d => d.filter(de => de.orderId === order.id)).filter(c => c.length > 0)[0],
              userName: user ? user.displayName : ''
            };
          }) : [];
        })
      );
  }

  getOrderList1() {
    return combineLatest(
      [this.db.collection<OrderModel>('orders').snapshotChanges(),
        this.db.collection<OrderDetailModel>('orderdetail').snapshotChanges(),
        this.db.collection<GoodsModel>('goods').snapshotChanges(),
        this.db.collection<UserModel>('users').snapshotChanges()
      ]).pipe(
      map(results => {
        const orderList = results[0].map((action) => {
          const data = action.payload.doc.data();
          return ({id: action.payload.doc.id, ...data}) as OrderModel;
        });
        const detailList = results[1].map((action) => {
          const data = action.payload.doc.data();
          return ({id: action.payload.doc.id, ...data}) as OrderDetailModel;
        });
        const goodList = results[2].map((action) => {
          const data = action.payload.doc.data();
          return ({id: action.payload.doc.id, ...data}) as GoodsModel;
        });
        const userList = results[3].map((action) => {
          const data = action.payload.doc.data();
          return ({id: action.payload.doc.id, ...data}) as UserModel;
        });
        const dgList = detailList.map(d => {
          const good = goodList.find(g => g.id === d.goodId);
          return ({...d, ...good});
        });
        return orderList ? orderList.map(order => {
          const user = userList.find(u => u.id === order.userId);
          return {
            ...order,
            details: dgList.filter(d => d.orderId === order.id),
            userName: user ? user.name : ''
          };
        }) : [];
      }));

  }

  getBarList(): Observable<Array<BarModel>> {
    return this.db.collection<OrderModel>('orders',
      model => model.orderBy('date', 'asc')).valueChanges().pipe(
      switchMap(orders => {
          return from(orders).pipe(
            groupBy(g => g.date.substring(0, 10)),
            mergeMap(group => group.pipe(toArray())),
            map(arr => {
                return new BarModel({
                  name: arr[0].date.substring(0, 10),
                  value: +sumBy(arr, 'total').toFixed(2)
                });
              }
            ),
            takeLast(10),
            toArray()
          );
        }
      )
    );
  }

  getBarHorizontalList(): Observable<Array<BarModel>> {
    return combineLatest([
      this.db.collection<OrderDetailModel>('orderdetail').snapshotChanges(),
      this.db.collection<GoodsModel>('goods').snapshotChanges(),
    ]).pipe(
      map(results => {
        const detailList = results[0].map((action) => {
          const data = action.payload.doc.data();
          return ({id: action.payload.doc.id, ...data}) as OrderDetailModel;
        });
        const goodList = results[1].map((action) => {
          const data = action.payload.doc.data();
          return ({id: action.payload.doc.id, ...data}) as GoodsModel;
        });
        const cateList = new Array<BarModel>();
        detailList.map(d => {
          const cateName = goodList.find(g => g.id === d.goodId).cateName;
          cateList.push({name: cateName, value: d.num});
        });
        return from(cateList).pipe(
          groupBy(g => g.name),
          mergeMap(group => group.pipe(toArray())),
          map(arr => {
              return new BarModel({
                name: arr[0].name,
                value: sumBy(arr, 'value')
              });
            }
          ),
          toArray()
        );
      }),
      mergeMap(r => r)
    );
  }

  getSaleAndNums(count = 15): Observable<Array<ChartModel>> {
    return this.db.collection<OrderModel>('orders',
      model => model.orderBy('date', 'asc')).snapshotChanges().pipe(
      switchMap(orders => {
          const detailList = orders.map((action) => {
            const data = action.payload.doc.data();
            return ({id: action.payload.doc.id, ...data}) as OrderModel;
          });
          return from(detailList).pipe(
            groupBy(g => g.date.substring(0, 10)),
            mergeMap(group => group.pipe(toArray())),
            map(arr => {
                return new ChartModel({
                  name: arr[0].date.substring(0, 10),
                  sales: +sumBy(arr, 'total').toFixed(2),
                  num: sumBy(arr, 'num')
                });
              }
            ),
            takeLast(count),
            toArray()
          );
        }
      )
    );
  }

}
