import { VendaService } from './../venda.service';
import { ClienteService } from './../../cliente/cliente.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.scss']
})
export class VendaFormComponent implements OnInit {

  title: string = 'Nova Venda'

  venda: any = {}

  clientes: any = []

  formasPagamento : any = [
    {
      codigo: 'DI',
      nome: 'Dinheiro'
    },
    {
      codigo: 'CH',
      nome: 'Cheque'
    },
    {
      codigo: 'CC',
      nome: 'Cartão de Crédito'
    },
    {
      codigo: 'CD',
      nome: 'Cartão de Débito'
    }
  ]

  constructor(
    private vendaSrv: VendaService,
    private clienteSrv: ClienteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    let params = this.actRoute.snapshot.params

    if(params['id']){
      try{
        this.venda = await this.vendaSrv.obterUm(params['id'])
        this.title = 'Atualizando venda'
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que Pena!', {duration: 5000})
      }
    }

    try{
      this.clientes = await this.clienteSrv.listar()
    }
    catch(erro) {
      this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})  
    }
  }

  async voltar(form: NgForm) {
    
    let result = true;
    console.log(form);
    
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.router.navigate(['/venda']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    
    if(form.valid){
      try{
        let msg = 'Venda atualizado com sucesso.'
        if(this.venda._id){
          await this.vendaSrv.atualizar(this.venda)
        }
        else{
          await this.vendaSrv.novo(this.venda)
          msg = 'Venda criado com sucesso.'
        }
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        this.router.navigate(['/venda'])
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    } 
  }

}
