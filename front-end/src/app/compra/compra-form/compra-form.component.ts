import { LivreiroService } from './../../livreiro/livreiro.service';
import { Component, OnInit } from '@angular/core';
import { CompraService } from '../compra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-compra-form',
  templateUrl: './compra-form.component.html',
  styleUrls: ['./compra-form.component.scss']
})
export class CompraFormComponent implements OnInit {

  title: string = 'Nova Compra'

  compra: any = {}
  livreiros: any = []
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
    private compraSrv : CompraService,
    private livreiroSrv: LivreiroService,
    private snackBar : MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    let params = this.actRoute.snapshot.params

    if(params['id']){
      try{
        this.compra = await this.compraSrv.obterUm(params['id'])
        this.title = 'Atualizando compra'
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que Pena!', {duration: 5000})
      }
    }

    try{
      this.livreiros = await this.livreiroSrv.listar()

    }
    catch(erro){
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
      this.router.navigate(['/compra']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{
        let msg = 'Compra atualizado com sucesso.'
        if(this.compra._id){
          await this.compraSrv.atualizar(this.compra)
        }
        else{
          await this.compraSrv.novo(this.compra)
          msg = 'Compra criado com sucesso.'
        }
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        this.router.navigate(['/compra'])
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    } 
  }

}
