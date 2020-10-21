import { Component, OnInit } from '@angular/core';
import { EditoraService } from '../editora.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-editora-list',
  templateUrl: './editora-list.component.html',
  styleUrls: ['./editora-list.component.scss']
})
export class EditoraListComponent implements OnInit {

  editoras: any = [];

  displayedColumns: string [] = ['nome_fantasia', 'cnpj','email', 'telefone', 'endereco', 'editar', 'excluir'];


  constructor(
    private editoraSrv: EditoraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
    ) { }

  async ngOnInit() {
    this.editoras = await this.editoraSrv.listar()
    console.log(this.editoras)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    if(result) {
        
      try {
        await this.editoraSrv.excluir(id)
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
