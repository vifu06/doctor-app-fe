import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private api: ApiService, private url: UrlService) { }

  getAppointments(params:any) {
    return this.api.get(`${this.url.appointment.getAppointments}/61730083b26409eb4c9564e2?status=${params.status}&date=${params.date}`);
  }
}
