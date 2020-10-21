import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EditoraService } from 'src/app/editora/editora.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { AutorService } from 'src/app/autor/autor.service';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.scss']
})
export class LivroFormComponent implements OnInit {

  title: string = 'Novo Livro'

  livro: any = {}

  autores: any =[]
  editoras: any = []

  constructor(
    private livroSrv : LivroService,
    private autorSrv: AutorService,
    private editoraSrv: EditoraService,
    private snackBar : MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    let params = this.actRoute.snapshot.params

    if(params['id']){
      try{
        this.livro = await this.livroSrv.obterUm(params['id'])
        this.title = 'Atualizando livro'
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que Pena!', {duration: 5000})
      }
    }

    try{
      this.autores = await this.autorSrv.listar()
      this.editoras = await this.editoraSrv.listar()

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
      this.router.navigate(['/livro']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{
        let msg = 'Livro atualizado com sucesso.'
        if(this.livro._id){
          await this.livroSrv.atualizar(this.livro)
        }
        else{
          await this.livroSrv.novo(this.livro)
          msg = 'Livro criado com sucesso.'
        }
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        this.router.navigate(['/livro'])
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }    
  }

}
