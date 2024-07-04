import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appCreditCard]'
})
export class CreditCardDirective {
  errorContainer !: HTMLParagraphElement
  constructor() { }

  @HostListener('input', ['$event'])
  validateCreditCardNumber(eve: Event){
    let inputControl = eve.target as HTMLInputElement

    let value = inputControl.value.replace(/\s+/g,"") as string
    if(value.length > 16){
      value = value.substring(0,16)
    }

    if(/[^\d]/.test(value)){
      this.errorContainer = document.createElement('p');
      this.errorContainer.innerHTML = "Please Enter Valid Credit Card Details";
      this.errorContainer.className = 'alert alert-danger';
      inputControl.parentNode?.append(this.errorContainer);   
    }else{
      this.errorContainer.innerHTML = '';
      this.errorContainer.className = 'd-none';
    }

    value = this.formatCreditCardValue(value)
    inputControl.value = value
  }

  formatCreditCardValue(data : string){
    let chArr = []
    for(let i=0;i < data.length;i+=4){
      chArr.push(data.slice(i, i+4))
    }

    return chArr.join(' ')
  }
}
