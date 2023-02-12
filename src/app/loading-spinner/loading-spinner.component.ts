import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})

export class LoadingSpinnerComponent {
  // constructor() { }

  // ngOnInit() {
  // }
}
// export class UseProgressSpinnerComponent implements OnInit {

//   constructor(
//     private dialog: MatDialog
//   ) {
//     let observable = new Observable(this.myObservable);
//     this.showProgressSpinnerUntilExecuted(observable);
//   }

//   ngOnInit() {
//   }

//   myObservable(observer) {
//     setTimeout(() => {
//       observer.next("done waiting for 5 sec");
//       observer.complete();
//     }, 5000);
//   }

//   showProgressSpinnerUntilExecuted(observable: Observable<Object>) {
//     let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
//       panelClass: 'transparent',
//       disableClose: true
//     });
//     let subscription = observable.subscribe(
//       (response: any) => {
//         subscription.unsubscribe();
//         //handle response
//         console.log(response);
//         dialogRef.close();
//       },
//       (error) => {
//         subscription.unsubscribe();
//         //handle error
//         dialogRef.close();
//       }
//     );
//   }
// }
