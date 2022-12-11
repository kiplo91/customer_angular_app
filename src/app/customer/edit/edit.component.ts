import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  customer!:Customer;
  form!: FormGroup;

  constructor( public customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['customerId'];
    this.customerService.find(this.id).subscribe((data: Customer)=>{
      this.customer = data;
    }); 
      
    this.form = new FormGroup({
      id : new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      secret_name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required)
    });


  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.customerService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Customer updated successfully!');
         this.router.navigateByUrl('customer/index');
    })
  }
    

}
