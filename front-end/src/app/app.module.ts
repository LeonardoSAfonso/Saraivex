import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainToolbarComponent } from './ui/main-toolbar/main-toolbar.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { MainFooterComponent } from './ui/main-footer/main-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AutorListComponent } from './autor/autor-list/autor-list.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { LivroListComponent } from './livro/livro-list/livro-list.component';
import { EditoraListComponent } from './editora/editora-list/editora-list.component';
import { VendaListComponent } from './venda/venda-list/venda-list.component';
import { CompraListComponent } from './compra/compra-list/compra-list.component';
import { ItemCompraListComponent } from './itemCompra/item-compra-list/item-compra-list.component';
import { ItemVendaListComponent } from './itemVenda/item-venda-list/item-venda-list.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { AutorFormComponent } from './autor/autor-form/autor-form.component';
import { FormsModule } from '@angular/forms';
import {NgxMaskModule} from  'ngx-mask';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { CompraFormComponent } from './compra/compra-form/compra-form.component';
import { EditoraFormComponent } from './editora/editora-form/editora-form.component';
import { ItemCompraFormComponent } from './itemCompra/item-compra-form/item-compra-form.component';
import { ItemVendaFormComponent } from './itemVenda/item-venda-form/item-venda-form.component';
import { LivroFormComponent } from './livro/livro-form/livro-form.component';
import { VendaFormComponent } from './venda/venda-form/venda-form.component';
import { LivreiroListComponent } from './livreiro/livreiro-list/livreiro-list.component';
import { LivreiroFormComponent } from './livreiro/livreiro-form/livreiro-form.component';

// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
/**** Datas em português no MatDatepicker  ****/
// É preciso instalar os seguintes pacotes:
// yarn add @angular/material-moment-adapter moment
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
/**********************************************/

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainMenuComponent,
    MainFooterComponent,
    AutorListComponent,
    ClienteListComponent,
    LivroListComponent,
    EditoraListComponent,
    VendaListComponent,
    CompraListComponent,
    ItemCompraListComponent,
    ItemVendaListComponent,
    LivreiroListComponent,
    ConfirmDlgComponent,
    AutorFormComponent,
    ClienteFormComponent,
    CompraFormComponent,
    EditoraFormComponent,
    ItemCompraFormComponent,
    ItemVendaFormComponent,
    LivroFormComponent,
    VendaFormComponent,
    LivreiroFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    /**** Datas em português no MatDatepicker  ****/
    MatMomentDateModule
    /**********************************************/
  ],
  providers: [
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    /**********************************************/],
  bootstrap: [AppComponent]
})
export class AppModule { }


