import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommunicationService } from '../service.comunication';

interface Country {
  name:string | null;
	value: number;
	amount: number;
}

@Component({
  standalone: true,
  selector: 'app-name-editor',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [ReactiveFormsModule],
})
export class NameEditorComponent {
  name = new FormControl('');
  value = new FormControl();
  amount = new FormControl()

  constructor(private http: HttpClient, private communicationService: CommunicationService) {}

  


  onInputChange() {

  // Função para receber o que o usuário está digitando
    const userInputName = this.name.value;
    const userInputValue = parseFloat(this.value.value);  // Converte para número (ajuste conforme necessário)
    const userInputAmount = parseInt(this.amount.value, 10);  // Converte para número inteiro (ajuste conforme necessário)

    const newCountry: Country = {
      name: userInputName,
      value: userInputValue,
      amount: userInputAmount
    };

    // Envia a requisição POST
    this.http.post<Country>('https://x8ki-letl-twmt.n7.xano.io/api:XrvEIpMk/produtos', newCountry)
      .subscribe(
        (data:any) => {
          console.log('Requisição POST bem-sucedida:', data);
          this.communicationService.notifyPostCompleted(); // Notifica o componente pai sobre o POST
          this.name.setValue('');
          this.value.setValue('');
          this.amount.setValue('');
        },
        (error:any) => {
          console.error('Erro na requisição POST:', error);
        }
      );
  
}
}
