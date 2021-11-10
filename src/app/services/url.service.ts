import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  baseUrl = "http://localhost:3000/api"

  slot = {
    getSlots : `${this.baseUrl}/slot/list`,
    createSlot: `${this.baseUrl}/slot/create`
  }

  appointment = {
    getAppointments : `${this.baseUrl}/appointment/list`,
    createAppointment : `${this.baseUrl}/appointment/create`
  }
 
}
