import { Component, OnInit, Input } from '@angular/core';
import { ItemCompraService } from '../item-compra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-item-compra-list',
  templateUrl: './item-compra-list.component.html',
  styleUrls: ['./item-compra-list.component.scss']
})
export class ItemCompraListComponent implements OnInit {

  @Input() compra: string = ''

  itensCompra: any = [];

  displayedColumns: string[] = ['compra', 'isbn','produto','quantidade','desconto','acrescimo','preco_total', 'excluir'];

  constructor(
    private itemCompraSrv: ItemCompraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
    ) { }

    async ngOnInit() {
      // Se for passado o parâmetro compra pelo componente pai
      if(this.compra != '') {
        this.itensCompra = await this.itemCompraSrv.filtrarCompra(this.compra)
      }
      else {
        this.itensCompra = await this.itemCompraSrv.listar()
      }
      console.log(this.itensCompra)
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
          await this.itemCompraSrv.excluir(id)
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