import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http"
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient
  ) {}
  
    postFoodBlog(data:any){
      return this.http.post("http://localhost:3000/posts", data).pipe(map((res:any)=> {
        return res;
      }))
    }
    getAllFoodBlog(){
      return this.http.get("http://localhost:3000/posts").pipe(map((res:any)=>{
        return res;
      }))
    }
    updateFoodBlog(data:any, id:number){
      return this.http.put("http://localhost:3000/posts/"+id, data).pipe(map((res:any)=>{
        return res;
      }))
    }
    deleteFoodBlog(id:number){
      return this.http.delete("http://localhost:3000/posts/"+ id).pipe(map((res:any)=> {
        return res;
      }))
    }
}
