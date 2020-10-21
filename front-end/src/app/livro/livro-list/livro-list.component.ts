import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.scss']
})
export class LivroListComponent implements OnInit {

  livros: any = [];

  displayedColumns : string[] = ['isbn', 'titulo','subtitulo', 'autor', 'editora', 'edicao', 'data_lancamento','genero','qtd_paginas', 'quantidade', 'editar', 'excluir']

  constructor(
    private livroSrv: LivroService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog 
    ) { }

  async ngOnInit() {
    this.livros = await this.livroSrv.listar()
    console.log(this.livros)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    if(result) {
        
      try {
        await this.livroSrv.excluir(id)
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
