import { LivreiroService } from './../livreiro.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-livreiro-list',
  templateUrl: './livreiro-list.component.html',
  styleUrls: ['./livreiro-list.component.scss']
})
export class LivreiroListComponent implements OnInit {

  livreiros: any = []

  displayedColumns : string[] = ['nome', 'cpf', 'email', 'telefone', 'endereco', 'editar', 'excluir']


  constructor(
    private livreiroSrv: LivreiroService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
    ) { }

  async ngOnInit() {
    this.livreiros = await this.livreiroSrv.listar()
    console.log(this.livreiros)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    if(result) {
        
      try {
        await this.livreiroSrv.excluir(id)
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
