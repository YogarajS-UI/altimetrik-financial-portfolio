import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

export type assetOption = {
  type: string,
  price: number
}

@Component({
  selector: 'app-invest-form',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './invest-form.component.html',
  styleUrl: './invest-form.component.css'
})
export class InvestFormComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  assetOptions:assetOption[]   = [
    { type: 'stock', price: 100 },
    { type: 'bond', price: 50 },
    { type: 'real-estate', price: 1000 },
    { type: 'crypto', price: 200 }
  ];
  date!:string;
  router = inject(Router)

  quantity = 1;

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.form.controls['quantity']?.valueChanges.subscribe((res) => {
        this.total = this.price * res;
      })
    }, 1)



  }
  assetValue!: number;

  price!: number;
  total: number = this.price
  onSubmit(f: any) {
this.router.navigate(['/'])
  }

  onAssetSelect(item: any) {
    this.quantity = 1;
    this.price = this.assetOptions.find((obj: assetOption) => obj.type === item)?.price!
    this.total = this.price
  }
}
