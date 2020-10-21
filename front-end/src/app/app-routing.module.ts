import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorListComponent } from './autor/autor-list/autor-list.component';
import { AutorFormComponent } from './autor/autor-form/autor-form.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { CompraListComponent } from './compra/compra-list/compra-list.component';
import { CompraFormComponent } from './compra/compra-form/compra-form.component';
import { EditoraListComponent } from './editora/editora-list/editora-list.component';
import { EditoraFormComponent } from './editora/editora-form/editora-form.component';
import { ItemCompraListComponent } from './itemCompra/item-compra-list/item-compra-list.component';
import { ItemCompraFormComponent } from './itemCompra/item-compra-form/item-compra-form.component';
import { ItemVendaListComponent } from './itemVenda/item-venda-list/item-venda-list.component';
import { ItemVendaFormComponent } from './itemVenda/item-venda-form/item-venda-form.component';
import { LivroListComponent } from './livro/livro-list/livro-list.component';
import { LivroFormComponent } from './livro/livro-form/livro-form.component';
import { VendaFormComponent } from './venda/venda-form/venda-form.component';
import { VendaListComponent } from './venda/venda-list/venda-list.component';
import { LivreiroListComponent } from './livreiro/livreiro-list/livreiro-list.component';
import { LivreiroFormComponent } from './livreiro/livreiro-form/livreiro-form.component';


const routes: Routes = [

  //Rotas Autor
  {
    path: 'autor', 
    component: AutorListComponent
  },
  {
    path:'autor/novo',
    component: AutorFormComponent
  },
  {
    path: 'autor/:id',
    component: AutorFormComponent
  },

  //Rotas cliente
  {
    path: 'cliente', 
    component: ClienteListComponent
  },
  {
    path:'cliente/novo',
    component: ClienteFormComponent
  },
  {
    path: 'cliente/:id',
    component: ClienteFormComponent
  },
  
  //Rotas Compra
  {
    path: 'compra', 
    component: CompraListComponent
  },
  {
    path:'compra/novo',
    component: CompraFormComponent
  },
  {
    path: 'compra/:id',
    component: CompraFormComponent
  },

  //Rotas Editora
  {
    path: 'editora', 
    component: EditoraListComponent
  },
  {
    path:'editora/novo',
    component: EditoraFormComponent
  },
  {
    path: 'editora/:id',
    component: EditoraFormComponent
  },

  //Rotas ItemCompra
  {
    path: 'itemCompra', 
    component: ItemCompraListComponent
  },
  {
    path:'itemCompra/novo',
    component: ItemCompraFormComponent
  },
  {
    path:'itemCompra/novo/:compra',
    component: ItemCompraFormComponent
  },
  {
    path: 'itemCompra/:id',
    component: ItemCompraFormComponent
  },

  //Rotas ItemVenda
  {
    path: 'itemVenda', 
    component: ItemVendaListComponent
  },
  {
    path:'itemVenda/novo',
    component: ItemVendaFormComponent
  },
  {
    path:'itemVenda/novo/:venda',
    component: ItemVendaFormComponent
  },
  {
    path: 'itemVenda/:id',
    component: ItemVendaFormComponent
  },

  //Rotas Livro
  {
    path: 'livro', 
    component: LivroListComponent
  },
  {
    path:'livro/novo',
    component: LivroFormComponent
  },
  {
    path: 'livro/:id',
    component: LivroFormComponent
  },

  //Rotas Venda
  {
    path: 'venda', 
    component: VendaListComponent
  },
  {
    path:'venda/novo',
    component: VendaFormComponent
  },
  {
    path: 'venda/:id',
    component: VendaFormComponent
  },

  //Rotas Livreiro
  {
    path: 'livreiro', 
    component: LivreiroListComponent
  },
  {
    path:'livreiro/novo',
    component: LivreiroFormComponent
  },
  {
    path: 'livreiro/:id',
    component: LivreiroFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
