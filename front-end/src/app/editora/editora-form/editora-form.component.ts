import { Component, OnInit } from '@angular/core';
import { EditoraService } from '../editora.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-editora-form',
  templateUrl: './editora-form.component.html',
  styleUrls: ['./editora-form.component.scss']
})
export class EditoraFormComponent implements OnInit {

  title: string = 'Nova Editora'

  editora: any = {}

  constructor(
    private editoraSrv: EditoraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    let params = this.actRoute.snapshot.params

    if(params['id']){
      try{
        this.editora = await this.editoraSrv.obterUm(params['id'])
        this.title = 'Atualizando editora'
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que Pena!', {duration: 5000})
      }
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
      this.router.navigate(['/editora']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{
        let msg = 'Editora atualizado com sucesso.'
        if(this.editora._id){
          await this.editoraSrv.atualizar(this.editora)
        }
        else{
          await this.editoraSrv.novo(this.editora)
          msg = 'Editora criado com sucesso.'
        }
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        this.router.navigate(['/editora'])
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    } 
  }

}
