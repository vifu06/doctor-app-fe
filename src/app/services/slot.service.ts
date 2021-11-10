import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(private api : ApiService, private url : UrlService) { }

  createSlot(params: any) {
    return this.api.post(this.url.slot.createSlot,params);
  }

  getSlots(params: any) {
    return this.api.get(`${this.url.slot.getSlots}?date=${params.date}&type=${params.type}`);
  }
}
