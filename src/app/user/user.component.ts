import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Observable, observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;
  paramSubscribe: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });

    // in built observables which shows count 
    // this.paramSubscribe = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customInterval = Observable.create(observer=> {
      let count = 0;
      setInterval(() => {
        observer.next(count); 
        if(count == 3){
          observer.complete();// it will not return anything
        } 
        if(count > 3){
          observer.error(new Error('Count is greater 3!'));          
        }     
        count++;
      }, 1000);
    });

    // to subscribe data
    this.paramSubscribe = customInterval.subscribe(data =>{
      console.log(data);
    },error => {console.log(error)},
    () => {console.log('completed')}
    )
  }
  ngOnDestroy() {
    this.paramSubscribe.unsubscribe();
  }

}
