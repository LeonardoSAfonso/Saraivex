import { Component, OnInit } from '@angular/core';
import { VendaService } from '../venda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.scss']
})
export class VendaListComponent implements OnInit {

  vendas: any = [];

  displayedColumns: string [] = ['num_venda', 'data_venda','cliente', 'forma_pagamento', 'data_pagamento', 'editar', 'excluir'];


  constructor(
    private vendaSrv: VendaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
    ) { }

  async ngOnInit() {
    this.vendas = await this.vendaSrv.listar()
    console.log(this.vendas)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    if(result) {
        
      try {
        await this.vendaSrv.excluir(id)
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
