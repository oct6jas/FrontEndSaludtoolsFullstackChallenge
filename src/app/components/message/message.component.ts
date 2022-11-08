import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() reload: boolean;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ok(){
    this.modal.dismiss();
    if(this.reload){
      window.location.reload();
    }
  }

}
