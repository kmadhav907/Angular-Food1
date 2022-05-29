import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { FoodBlog } from './FodBlog.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup;
  foodBlogModel: FoodBlog = new FoodBlog();
  foodBlogData !:any;
  showUpdate !: boolean;
  showAdd !:boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {

   }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      foodName:[""],
      foodDescription:[""],
    })
    this.getAllFoodBlog();
  }
  postFoodBlogDetails(){
    this.foodBlogModel.foodName = this.formValue.value.foodName;
    this.foodBlogModel.foodDescription = this.formValue.value.foodDescription;
    this.api.postFoodBlog(this.foodBlogModel).subscribe(res => {
      console.log(res);
      let ref  = document.getElementById("cancel")
      ref?.click();
      alert("Blog Added successfully");
      this.formValue.reset();
      this.getAllFoodBlog();
    },
    error => {
      alert("Something went wrong");
    })
  }
  getAllFoodBlog(){
    this.api.getAllFoodBlog().subscribe(res => {
      console.log(res);
      this.foodBlogData = res?.splice(1, res.length - 1);
    })
  }
  deleteFoodBlog(blog: any){
    this.api.deleteFoodBlog(blog.id).subscribe(res => {
      alert("Blog Deleted successfully");
      this.getAllFoodBlog();
    }, error => {
      alert("Something went wrong")
    })
  }
  editBlog(blog :any){
    this.showAdd = false;
    this.showUpdate = true;
    this.foodBlogModel.id = blog.id;
    this.formValue.controls["foodName"].setValue(blog.foodName);
    this.formValue.controls["foodDescription"].setValue(blog.foodDescription);
  }
  updateBlogDetails(){
    this.foodBlogModel.foodName = this.formValue.value.foodName;
    this.foodBlogModel.foodDescription = this.formValue.value.foodDescription;
    this.api.updateFoodBlog(this.foodBlogModel, Number(this.foodBlogModel.id)).subscribe(res => {
      console.log(res);
      let ref  = document.getElementById("cancel")
      ref?.click();
      alert("Blog Uploaded successfully");
      this.formValue.reset();
      this.getAllFoodBlog();
    },
    error => {
      alert("Something went wrong");
    })
  }
  clickAddedBlog(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;


  }
}
