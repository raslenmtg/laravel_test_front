import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreServiceService {

  constructor(private http: HttpClient) {
  }

  getrates() {
    return this.http.get<any>(environment.server_url + '/api/rates');
  }


  getvirtualrates() {
    return this.http.get<any>(environment.server_url + '/api/virtualrates');
  }

  getmetalrates() {
    return this.http.get<any>(environment.server_url + '/api/metalrates');

  }
}
