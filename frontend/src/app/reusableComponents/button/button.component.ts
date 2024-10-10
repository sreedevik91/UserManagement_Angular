import { Component, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
@Input() btnText=''
@Input() btnClass=''

@Output() onBtnClick : EventEmitter<any>= new EventEmitter<any>()

onClick(){
  this.onBtnClick.emit()
}

}
