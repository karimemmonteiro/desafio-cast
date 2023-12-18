import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NameEditorComponent } from "./Form/form.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommunicationService } from './service.comunication';
import { NgbdModalComponent, NgbdModalContent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface Country {
	name: string;
	value: number;
	id: number;
	amount: number;
}

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [CommonModule, RouterOutlet, FormsModule, NameEditorComponent, HttpClientModule, NgbdModalComponent]
})

export class AppComponent {
	countries: Country[] = [];
	Header = 'Produtos';
	username = 'youngTech';
	favoriteFramework = '';

	constructor(private http: HttpClient, private communicationService: CommunicationService, private modalService: NgbModal ){ }

	ngOnInit() {
		this.getData();
		this.communicationService.postCompleted$.subscribe(() => {
			this.getData();
		});
	}

	getData() {
		const API_ENDPOINT = 'https://x8ki-letl-twmt.n7.xano.io/api:XrvEIpMk/produtos';

		this.http.get<Country[]>(API_ENDPOINT).subscribe({
			next: (data) => {
				this.countries = data;
			},
			error: (error) => {
				console.error('Erro ao obter os dados:', error);
			}
		});
	}
	deleteCountry(countryId: number) {
		const DELETE_ENDPOINT = `https://x8ki-letl-twmt.n7.xano.io/api:XrvEIpMk/produtos/${countryId}`;

		this.http.delete(DELETE_ENDPOINT).subscribe(
			() => {
				console.log(`País com ID ${countryId} excluído com sucesso.`);
				this.getData();
			},
			(error) => {
				console.error(`Erro ao excluir o país com ID ${countryId}:`, error);
			}
		);
	}
	editCountry(country: Country) {
		const modalRef = this.modalService.open(NgbdModalContent, {centered: true, size: 'xl'});
		modalRef.componentInstance.id = country.id;
		modalRef.componentInstance.name = country.name;
		modalRef.componentInstance.amount = country.amount;
		modalRef.componentInstance.value = country.value;
	  }



}
