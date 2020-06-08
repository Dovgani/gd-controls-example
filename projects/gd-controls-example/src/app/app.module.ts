import { FormsModule         } from '@angular/forms';
import { BrowserModule       } from '@angular/platform-browser';
import { NgModule            } from '@angular/core';
import { CommonModule        } from '@angular/common'; 

import { GDWindowModule      } from 'gd-window';
import { GDCommonModule      } from 'gd-common';
import { GDTabModule         } from 'gd-tab';
import { GDPGModule          } from 'gd-pg';
import { GDAccordionModule   } from 'gd-accordion';
import { GDSplitterModule    } from 'gd-splitter';
import { GDContextmenuModule } from 'gd-contextmenu';
import { AppComponent        } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,

    GDCommonModule,
    GDContextmenuModule,
    GDAccordionModule,
    GDSplitterModule,
    GDTabModule,
    GDPGModule,
    GDWindowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
