import { AutorService } from './../autor.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-autor-form',
  templateUrl:'./autor-form.component.html',
  styleUrls: ['./autor-form.component.scss']
})
export class AutorFormComponent implements OnInit {

  title: string = 'Novo Autor'

  autor: any = {}
  
  constructor(
    private autorSrv: AutorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    let params = this.actRoute.snapshot.params

    if(params['id']){
      try{
        this.autor = await this.autorSrv.obterUm(params['id'])
        this.title = 'Atualizando autor'
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
      this.router.navigate(['/autor']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{
        let msg = 'Autor atualizado com sucesso.'
        if(this.autor._id){
          await this.autorSrv.atualizar(this.autor)
        }
        else{
          await this.autorSrv.novo(this.autor)
          msg = 'Autor criado com sucesso.'
        }
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        this.router.navigate(['/autor'])
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    } 
  } 


}
