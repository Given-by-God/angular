import { BrowserModule }                    from '@angular/platform-browser';
import { RouterModule }                     from '@angular/router';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';

import { routes, AppRoutingModule }         from './app-routing.module';
import { AppComponent }                     from './app.component';
import { UIModule }                         from './ui/ui.module';
import { NiComponentsModule }               from './ni-components/ni-components.module';
// import { PagesModule }                      from './pages/pages.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DxDataGridModule } from 'devextreme-angular';
import { SortableModule } from 'ngx-bootstrap/sortable';


import {HttpClientModule}                   from '@angular/common/http'

import {PageFbakksComponent} from './pages/fbakks/fbakks.component'

import { DefaultLayoutComponent }           from './layouts/default/default.component';
import { BoxedLayoutComponent }             from './layouts/boxed/boxed.component';
import { DefaultCLayoutComponent }          from './layouts/default-c/default-c.component';
import { BoxedCLayoutComponent }            from './layouts/boxed-c/boxed-c.component';
import { ExtraLayoutComponent }             from './layouts/extra/extra.component';


import { FacebookService }                  from './services/facebook/facebook.service';

import { MakeTablePipe }                    from './pipe/make-table.pipe';
    




@NgModule({
  declarations : [    
    AppComponent,
    DefaultLayoutComponent,
    BoxedLayoutComponent,
    DefaultCLayoutComponent,
    BoxedCLayoutComponent,
    ExtraLayoutComponent,
    PageFbakksComponent,
    MakeTablePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    DxDataGridModule,
    SortableModule.forRoot(),
    // AppRoutingModule,
    UIModule, 
    // NiComponentsModule,
    // PagesModule
  ],
  providers:[FacebookService],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
