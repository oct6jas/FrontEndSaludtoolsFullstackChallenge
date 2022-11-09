import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralServicesService } from 'src/app/services/general-services.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-delete-entity',
  templateUrl: './delete-entity.component.html',
  styleUrls: ['./delete-entity.component.css']
})
export class DeleteEntityComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() type: string;
  @Input() id: string;
  entity = {
    id:null
  }

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private service: GeneralServicesService) { }

  ngOnInit(): void {
    this.entity.id = this.id;
  }

  deleteEntity(){
    this.service.deletePatient(this.type,this.entity).subscribe(
      response => {
        this.modal.dismiss();
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Borrado";
        modalRef.componentInstance.message = "El borrado fue exitoso exito";
        modalRef.componentInstance.reload = true;
      },
      (error) => {
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Error en el borrado";
        modalRef.componentInstance.message = error.error.menssage;
      }

    )

  }


}
