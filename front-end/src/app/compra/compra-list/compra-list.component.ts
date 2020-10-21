import { Component, OnInit } from '@angular/core';
import { CompraService } from '../compra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.scss']
})
export class CompraListComponent implements OnInit {

  compras: any = [];

  displayedColumns: string [] = ['num_compra', 'data_compra','livreiro', 'forma_pagamento', 'data_pagamento', 'editar', 'excluir'];


  constructor(
    private compraSrv: CompraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
    ) { }

  async ngOnInit() {
    this.compras = await this.compraSrv.listar()
    console.log(this.compras)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    if(result) {
        
      try {
        await this.compraSrv.excluir(id)
        this.ngOnInit() // Atualizar os dados da tabela
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', 
          { duration: 5000 });
      }
      catch(erro) {
        this.snackBar.open('ERRO: não foi possível excluir este item.', 
          'Que pena!', { duration: 5000 });
      }
    }
  }


}
