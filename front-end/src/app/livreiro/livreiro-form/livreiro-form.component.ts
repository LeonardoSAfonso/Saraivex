import { Component, OnInit } from '@angular/core';
import { LivreiroService } from '../livreiro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-livreiro-form',
  templateUrl: './livreiro-form.component.html',
  styleUrls: ['./livreiro-form.component.scss']
})
export class LivreiroFormComponent implements OnInit {

  title: string = 'Novo Livreiro'

  livreiro: any = {}

  constructor(
    private livreiroSrv: LivreiroService,
    private snackBar : MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    let params = this.actRoute.snapshot.params

    if(params['id']){
      try{
        this.livreiro = await this.livreiroSrv.obterUm(params['id'])
        this.title = 'Atualizando livreiro'
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
      this.router.navigate(['/livreiro']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{
        let msg = 'Livreiro atualizado com sucesso.'
        if(this.livreiro._id){
          await this.livreiroSrv.atualizar(this.livreiro)
        }
        else{
          await this.livreiroSrv.novo(this.livreiro)
          msg = 'Livreiro criado com sucesso.'
        }
        this.snackBar.open(msg, 'Entendi', {duration: 5000})
        this.router.navigate(['/livreiro'])
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
