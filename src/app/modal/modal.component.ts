import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameEditorComponent } from '../Form/form.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommunicationService } from '../service.comunication';

interface Country {
  produtos_id?: number
  name: string | null;
  value: number;
  amount: number;
}

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NameEditorComponent, HttpClientModule, ReactiveFormsModule],
  styleUrl: './modal.component.scss',
  template: `
		<div class="modal-header" >
    <svg width="2rem" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

			<h4 class="modal-title">Editar Produto</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>

    <div class="containerForm">
    <div class="fieldInput">
        <label for="name">Name: </label>
        
            <input placeholder="EX:Panetone" id="name" type="text" [(ngModel)]="name" > 
    </div>
    <div class="fieldInput">
        <label for="value">Valor: </label>
        <input placeholder="R$" id="value" type="number" [(ngModel)]="value"  >
    </div>
   
    <div class="fieldInput">
        <label for="amount">Quantidade: </label>
        <input placeholder="0" id="amount" type="number" [(ngModel)]="amount"  >
    </div>
    <button class="btnCadastrar" (click)="onInputChange()">Editar</button>
    
    
    
</div>
		<div class="modal-footer">
      
		</div>
	`,
})
export class NgbdModalContent {

  activeModal = inject(NgbActiveModal);
  @Input() amount: number = 0;
  @Input() name: string = '';
  @Input() value: number = 0;
  @Input() id: number = 0;


  constructor(private http: HttpClient, private communicationService: CommunicationService) { }

  onInputChange() {
    const userInputId = this.id;
    const userInputName = this.name;
    const userInputValue = (this.value);
    const userInputAmount = (this.amount);

    const newCountry: Country = {
      produtos_id: userInputId,
      name: userInputName,
      value: userInputValue,
      amount: userInputAmount
    };

    this.http.post<Country>(`https://x8ki-letl-twmt.n7.xano.io/api:XrvEIpMk/produtos/${userInputId}`, newCountry)
      .subscribe(
        (data: any) => {
          console.log('Requisição POST bem-sucedida:', data);
          this.communicationService.notifyPostCompleted();
          this.activeModal.close('Close click');
        },
        (error: any) => {
          console.error('Erro na requisição POST:', error);
        }
      );

  }



}

@Component({
  selector: 'ngbd-modal-component',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',

  imports: [CommonModule, RouterOutlet, FormsModule, NameEditorComponent, HttpClientModule]
})
export class NgbdModalComponent {
  private modalService = inject(NgbModal);

  open(name: string, value: number, amount: number, id: number) {
    const modalRef = this.modalService.open(NgbdModalContent, { fullscreen: true });
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.value = value;
    modalRef.componentInstance.amount = amount;
    modalRef.componentInstance.id = id;
  }
}