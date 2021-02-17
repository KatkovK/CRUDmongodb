import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RestService {

  private myUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {

    return this.http.get(`${this.myUrl}/users`);
  };

  post(data) {

    return this.http.post(`${this.myUrl}/users/add`, data);
  };

  update(data) {
    
    return this.http.put(`${this.myUrl}/users/${data._id}`, data);
  };

  delete(id) {

    return this.http.delete(`${this.myUrl}/users/${id}`);
  };
}
     






 