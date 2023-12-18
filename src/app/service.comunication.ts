// communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private postCompleted = new Subject<void>();

  postCompleted$ = this.postCompleted.asObservable();

  notifyPostCompleted() {
    this.postCompleted.next();
  }
}
