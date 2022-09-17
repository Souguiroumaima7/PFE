import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from './../../services/product.service';
import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/models/category.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: any;
  filtredProducts : any;
  categories!:Category[] ;
  searchText = ''
  searchCategory= new FormControl('');
  public filterCategory : any
  listproduct :any
  product:any=[]


  constructor(private api : ApiService, private cartService : CartService,private productservice:ProductService ,private CategoryService:CategoryService) { }

  addtocart(product: any) {
    this.cartService.addtoCart(product);
  }

  ngOnInit(): void {
  this.searchCategory.setValue('all')
  this.getall()
  }

  getall () {
    this.productservice.getproducts().subscribe((res:any)=>{
      this.products = res["data"]
      this.filtredProducts = this.products
      console.log("list product", this.products)
    })
  }
    deleteproducts(id:any) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productservice.deleteproducts(id).subscribe((res:any)=>{
            console.log(res)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.getall()
        })
      }
      })
    }
    applyFilter()
    {
     this.filtredProducts = this.products.filter( (product: any) => {
      if (this.searchCategory.value=='all'){
        if (this.searchText!='')
               return product.name.toLowerCase().includes(this.searchText.toLowerCase())

        else {
          return true
        }
      }else{
        if (this.searchText!='')
        return product.name.toLowerCase().includes(this.searchText.toLowerCase()) && product.category==this.searchCategory.value;
        else {
          return product.category==this.searchCategory.value
        }

      }
      })
    }
}





