import { CompraService } from './../../compra/compra.service';
import { Component, OnInit } from '@angular/core';
import { ItemCompraService } from '../item-compra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';  
import { Location } from '@angular/common';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';
import { LivroService } from 'src/app/livro/livro.service';

@Component({
  selector: 'app-item-compra-form',
  templateUrl: './item-compra-form.component.html',
  styleUrls: ['./item-compra-form.component.scss']
})
export class ItemCompraFormComponent implements OnInit {

  title: string = 'Novo item de compra'

  compraDisabled : boolean = false

  itemCompra : any = { desconto: 0, acrescimo: 0 }  

  // Entidades relacionadas
  compras : any = []   // Vetor vazio
  livros : any = []

  constructor(
    private itemCompraSrv : ItemCompraService,
    private compraSrv : CompraService,
    private livroSrv: LivroService,
    private snackBar: MatSnackBar,
    private actRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params

    // Existe um parâmetro chamado :id?
    if(params['id']) {
      // É caso de atualização. É necesário consultar o back-end
      // para recuperar o registro e colocá-lo para edição
      try {
        this.itemCompra = await this.itemCompraSrv.obterUm(params['id'])
        this.title = 'Atualizando item de compra'

        // Impede a alteração da compra relacionada ao item
        this.compraDisabled = true

      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }

    // Existe um parâmetro chamado :compra?
    if(params['compra']) {
      // Forçar o id da compra no item de compra
      this.itemCompra.compra = params['compra']
      
      // Desabilita o select da compra
      this.compraDisabled = true
    }

    // Entidades relacionadas
    try {
      this.compras = await this.compraSrv.listar()
      this.livros = await this.livroSrv.listar()
    }
    catch(erro) {
      this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})  
    }
  
  }

  async voltar(form: NgForm) {
    
    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.location.back() // Retorna à listagem
    }

  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
        let msg = 'Item de compra atualizado com sucesso.'
        // Se existir o campo _id, é caso de atualização
        if(this.itemCompra._id) {
          await this.itemCompraSrv.atualizar(this.itemCompra)
        }
        // Senão, é caso de criar um nova itemCompra
        else {
          await this.itemCompraSrv.novo(this.itemCompra)
          msg = 'Item de compra criado com sucesso.'
        }
        // Dá o feedback para o usuário
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        // Voltar à listagem
        this.location.back()
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}