import { Component, OnInit, Input } from '@angular/core';
import { ItemVendaService } from '../item-venda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-item-venda-list',
  templateUrl: './item-venda-list.component.html',
  styleUrls: ['./item-venda-list.component.scss']
})
export class ItemVendaListComponent implements OnInit {

  @Input() venda: string = ''

  itensVenda: any = [];

  displayedColumns: string[] = ['venda', 'isbn','produto','quantidade','desconto','acrescimo','preco_total', 'excluir'];

  constructor(
    private itemVendaSrv: ItemVendaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
    ) { }

    async ngOnInit() {
      // Se for passado o parâmetro venda pelo componente pai
      if(this.venda != '') {
        this.itensVenda = await this.itemVendaSrv.filtrarVenda(this.venda)
      }
      else {
        this.itensVenda = await this.itemVendaSrv.listar()
      }
      console.log(this.itensVenda)
    }
  
    async excluirItem(id: string) {
      const dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: {question: 'Deseja realmente excluir este item?'}
      });
  
      let result = await dialogRef.afterClosed().toPromise();
      
      //if(confirm('Deseja realmente excluir este item?')) {
      if(result) {
          
        try {
          await this.itemVendaSrv.excluir(id)
          this.ngOnInit() // Atualizar os dados da tabela
          //alert('Exclusão efetuada com sucesso.')
          this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', 
            { duration: 5000 });
        }
        catch(erro) {
          //alert('ERRO: não foi possível excluir este item.')
          this.snackBar.open('ERRO: não foi possível excluir este item.', 
            'Que pena!', { duration: 5000 });
        }
      }
    }
  
  }