import { Component              } from '@angular/core';
import { ViewChild              } from '@angular/core';
import { AfterViewInit          } from '@angular/core';
import { ChangeDetectorRef      } from '@angular/core';

import { GDAccordionComponent   } from 'gd-accordion';
import { GDContextmenuComponent } from 'gd-contextmenu';
import { GDPGComponent          } from 'gd-pg';
import { IPGCategory            } from 'gd-common';
import { PGData, IPGData        } from 'gd-common';
import { GDCommonService        } from 'gd-common';
import { ISplitter              } from 'gd-common';
import { SplitterPanels         } from 'gd-common';
import { GDWindowComponent      } from 'gd-window';

import { Subscription           } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls:  ['./app.component.css']
})
export class AppComponent implements AfterViewInit
{
    @ViewChild('myWindow1')     window1   : GDWindowComponent;
    @ViewChild('myWindow2')     window2   : GDWindowComponent;
    @ViewChild('myWindow3')     window3   : GDWindowComponent;
    @ViewChild('myWindow4')     window4   : GDWindowComponent;
    @ViewChild('myWindow5')     window5   : GDWindowComponent;
    @ViewChild('myAccordion')   accordion : GDAccordionComponent;
    @ViewChild('myPG')          pg        : GDPGComponent;
    @ViewChild('myMenu')        myMenu    : GDContextmenuComponent;

    public  splitter   : ISplitter;

    public  pgSettings : Array<IPGCategory>;
    private pgData     : IPGData;
    public  myData     =
    {
        ID          : 1,
        Name        : 'Name',
        Description : 'Description',
        Date        : '01/06/2020',
        IsDefault   : true,
        CustomStyle : { Name : "Custom1", Description : "Custom1 Description", Date : "04/28/2020" },
        Style       : '',
        StyleID     : 1,
        Color       : '#ff00ff'
    };

    get PGData()      : IPGData   { return this.pgData;         }
    set PGData( value : IPGData ) {        this.pgData = value; }

    private subscriptionContentClick : Subscription;
    private subscriptionPGSave       : Subscription;

    public  constructor( private cdRef : ChangeDetectorRef,  private service : GDCommonService )
    {
        this.subscriptionContentClick = service.clickContent$.subscribe( (data : any) => this.onWindowContentClick(data) );
        this.subscriptionPGSave       = service.pgSave$      .subscribe( (data : any) => this.onPGSave(data) );

        this.pgSettings   = [
            {
                Name: 'Default Properties',
                isExpanded : true,
                isDisabled : true,
                Properties: [
                    {
                        categoryName  : 'Properties',
                        name          : 'ID',
                        display       : 'ID',
                        type          : 'number',
                        editor        : 'number',
                        isCustom      : false,
                        isDisabled    : true,
                        tabStop       : 1
                    },
                    {
                        categoryName  : 'Properties',
                        name          : 'Name',
                        display       : 'Name',
                        type          : 'string',
                        editor        : 'string',
                        required      : '*',
                        isCustom      : false,
                        isDisabled    : false,
                        tabStop       : 2
                    },
                    {
                        categoryName  : 'Properties',
                        name          : 'Description',
                        display       : 'Description',
                        type          : 'text',
                        editor        : 'text',
                        isCustom      : false,
                        isDisabled    : false,
                        tabStop       : 3
                    },
                    {
                        categoryName  : 'Properties',
                        name          : 'Date',
                        display       : 'Date',
                        type          : 'date',
                        editor        : 'date',
                        data          : 'mm/dd/yyyy',
                        isCustom      : false,
                        isDisabled    : false,
                        tabStop       : 4
                    },
                    {
                        categoryName  : 'Properties',
                        name          : 'IsDefault',
                        display       : 'Is Default',
                        type          : 'boolean',
                        editor        : 'checkbox',
                        isCustom      : false,
                        isDisabled    : false,
                        tabStop       : 5
                    },
                    {
                        categoryName  : 'Properties',
                        name          : 'Color',
                        display       : 'Color',
                        type          : 'color',
                        editor        : 'color',
                        isCustom      : false,
                        isDisabled    : false,
                        tabStop       : 7
                    },
                    {
                        categoryName  : 'Properties',
                        name          : 'CustomStyle',
                        childName     : 'Name',
                        nameID        : 'StyleID',
                        display       : 'Custom Style',
                        type          : 'number',
                        editor        : 'object',
                        valueID       : 2,
                        data          : [ 
                            {
                                Name: 'Default Properties',
                                isExpanded : true,
                                isDisabled : true,
                                Properties: [
                                    {
                                        categoryName  : 'Properties',
                                        name          : 'Name',
                                        display       : 'Name',
                                        type          : 'string',
                                        editor        : 'string',
                                        required      : '*',
                                        isCustom      : false,
                                        isDisabled    : false,
                                        tabStop       : 1
                                    },
                                    {
                                        categoryName  : 'Properties',
                                        name          : 'Description',
                                        display       : 'Description',
                                        type          : 'text',
                                        editor        : 'text',
                                        isCustom      : false,
                                        isDisabled    : false,
                                        tabStop       : 2
                                    },
                                    {
                                        categoryName  : 'Properties',
                                        name          : 'Date',
                                        display       : 'Date',
                                        type          : 'date',
                                        editor        : 'date',
                                        data          : 'mm/dd/yyyy',
                                        isCustom      : false,
                                        isDisabled    : false,
                                        tabStop       : 3
                                    }
                                ]
                            }       
                        ], 
                        isCustom      : false,
                        isDisabled    : false,
                        tabStop       : 8
                    },
                    {
                        categoryName  : 'Properties',
                        name          : 'Style',
                        nameID        : 'StyleID',
                        display       : 'Style',
                        type          : 'number',
                        editor        : 'combobox',
                        valueID       : 2,
                        data          : [ { id : 1, name : 'Default' }, { id : 2, name : 'Main' }, { id : 3, name : 'President' } ], 
                        isCustom      : false,
                        isDisabled    : false,
                        tabStop       : 6
                    }
                ]
            },
            {
                Name: 'Custom Properties',
                isExpanded : true,
                isDisabled : true,
                Properties: [
                    {
                        categoryName  : 'Custom Properties',
                        name          : 'ID',
                        display       : 'ID',
                        type          : 'number',
                        editor        : 'number',
                        isCustom      : false,
                        isDisabled    : true,
                        tabStop       : 1
                    }
                ]
            }
        ];     

        this.pgData = new PGData( 'data', '1', 'data edit', this.myData, '' );
    }

    public ngAfterViewInit(): void
    {
        // disable browser contextmenu
        document.addEventListener( 'contextmenu', (event : any) => event.preventDefault() );   

        this.window1.AddClass('gd-accordion');
        this.window1.IsIconVisible = true;
        this.window1.Icon          = './assets/Images/favicon.ico';
        this.window1.Title         = 'GD Accordion';
        this.window1.Y =  40;
        this.window1.X = 360;
        this.window1.W = 280;
        this.window1.H = 300;
        this.window1.Open();

        this.accordion.Expand(1);

        this.window2.AddClass('gd-pg');    
        this.window2.IsIconVisible      = true;
        this.window2.Icon               = './assets/Images/favicon.ico';
        this.window2.Title              = 'GD Property Grid';
        this.window2.AutoCloseOnButtonClick = false;
        this.window2.IsOKVisible        = true;
        this.window2.IsMessageVisible   = true;
        this.window2.IsCancelVisible    = true;
        this.window2.IsContentBorderVisible = false
        this.window2.OK                 = 'Save';
        this.window2.Cancel             = 'Cancel';
    
        this.window2.Y =  40;
        this.window2.X =  40;
        this.window2.W = 270;
        this.window2.H = 360;
        this.window2.ButtonsActionToChild = true;
        this.window2.ChildID = this.pg.ID;
        this.window2.Open();

        this.pg.ParentID = this.window2.ID;
        this.pg.categories.Expand(0);

        this.window3.AddClass('gd-tab');    
        this.window3.IsIconVisible = true;
        this.window3.Icon          = './assets/Images/favicon.ico';
        this.window3.Title         = 'GD Tab';
        this.window3.Y =  40;
        this.window3.X = 690;
        this.window3.W = 270;
        this.window3.H = 300;
        this.window3.Open();

        this.window4.AddClass('gd-test');
        this.window4.Name = 'context menu test';
        this.window4.IsIconVisible = true;
        this.window4.Icon          = './assets/Images/favicon.ico';
        this.window4.Title         = 'GD Contextmenu test';
        this.window4.Y =   40;
        this.window4.X = 1010;
        this.window4.W =  270;
        this.window4.H =  300;
        this.window4.Open();

        this.splitter = 
        {
            buttonSize : 0, 
            panels :
            [
                {
                    layout             : SplitterPanels.top, 
                    isOpened           : true,
                    isButtonVisible    : false,
                    isSeperatorVisible : true,
                    isSeperatorLocked  : true,
                    seperatorThickness : 1,
                    size               : 50 
                },
                { 
                    layout             : SplitterPanels.left, 
                    isOpened           : true,
                    isButtonVisible    : true,
                    isSeperatorVisible : true,
                    isSeperatorLocked  : false,
                    seperatorThickness : 3,
                    size               : 50 
                },
                { 
                    layout             : SplitterPanels.right, 
                    isOpened           : true,
                    isButtonVisible    : true,
                    isSeperatorVisible : true,
                    isSeperatorLocked  : false,
                    seperatorThickness : 3,
                    size               : 50 
                },
                {
                    layout             : SplitterPanels.bottom, 
                    isOpened           : true,
                    isButtonVisible    : true,
                    isSeperatorVisible : true,
                    isSeperatorLocked  : false,
                    seperatorThickness : 3,
                    size               : 50 
                },
            ]    
        };

        this.window5.AddClass('gd-splitter');    
        this.window5.IsIconVisible = true;
        this.window5.Icon          = './assets/Images/favicon.ico';
        this.window5.Title         = 'GD Splitter';
        this.window5.Y =   40;
        this.window5.X = 1330;
        this.window5.W =  300;
        this.window5.H =  300;
        this.window5.Open();

    }    

    public  ngOnDestroy()
    {
        if( this.subscriptionContentClick ) this.subscriptionContentClick.unsubscribe();
        if( this.subscriptionPGSave       ) this.subscriptionPGSave      .unsubscribe();
    }  

    public  ngAfterViewChecked() 
    {
        this.cdRef.detectChanges();
    }

    private onPGSave( data: IPGData ) : void
    {
        switch( data.action )
        {
            case 'data edit' : 
            {
                data.data.IsDefault = data.data.IsDefault === '1' || data.data.IsDefault === 'TRUE' || data.data.IsDefault === 'True' || data.data.IsDefault === 'true' ? 'True' : 'False';

                // Update Your Data;
            }
            break;
        }
    }

    public  onWindowContentClick( data : any ) 
    {
        if( data.windowName   === '"context menu test' ) return;
        if( data.event.button !== 2                    ) return;

        setTimeout( () =>
        {
            this.myMenu.Show( data.event.pageX + 15, data.event.pageY + 15, 120, 77, ['Add'], null );
        }, 500 );
    }

    public  onMyMenuItemClick( data : any ) 
    {
        alert(data);
    }
}
