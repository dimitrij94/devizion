/**
 * Created by Dmitrij on 11.07.2017.
 */

import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
@Component({
    selector: 'contacts-dialog-component',
    template: `
        <div class="wrapper">
            <div fxLayout="row" fxLayoutAlign="start stretch">
                <div class="contacts-list left">
                    <h4>Головний офіс</h4>
                    <p>(03344) 3-12-76</p>
                    <p>(097) 536-50-83</p>
                </div>
                <div class="divider"></div>
                <div class="contacts-list right">
                    <h4>Філіал</h4>
                    <p>(03342) 3-81-71</p>
                    <p>(097) 296-45-50</p>
                </div>
            </div>
            <button class="ok-button" md-button (click)="dialogRef.close()">OK</button>
        </div>
    `,
    styleUrls: ['./contacts-dialog.component.scss']
})
export class ContactsDialogComponent {
    constructor(private dialogRef: MdDialogRef<ContactsDialogComponent>) {
    }

}
