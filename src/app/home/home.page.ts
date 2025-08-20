import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {


  CEP: string = '';
  endereco:any = null;

  UF: string = '';
  cidade: string = '';
  logradouro: string = '';
  resultados: any[] = [];

  opcao = 1;

  // private apiURL ='https://viacep.com.br/ws'



  constructor(private router: Router, private http: HttpClient, public toastController: ToastController) {}


  buscarCep(){
if(this.CEP && this.CEP.length === 8){
 const URL = `https://viacep.com.br/ws/${this.CEP}/json/`

 this.http.get<any>(URL).subscribe({next: (data) => {
this.endereco = data.erro ?
null : data;
 },
error :() => {
  this.endereco= null
}});
} else{
this.endereco = null;
}


}
  buscarEndereco(){
    if (this.UF && this.cidade && this.logradouro) {
      const URL = `https://viacep.com.br/ws/${this.UF}/${this.cidade}/${this.logradouro}/json/`

      this.http.get<any>(URL).subscribe({next: (data) => {
        this.resultados = data.erro ?
        null : data;
        },
        error :() => {
          this.resultados= [];
        }});
      } else{
      this.resultados = [];
    }
  }

  escolha() {
    this.opcao = this.opcao + 1
    if (this.opcao % 2 == 0) {
      console.log('busca por endereco')
    } else {
      console.log('busca por cep')
    }
  }

}
