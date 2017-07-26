import {Component} from "@angular/core";
/**
 * Created by Dmitrij on 24.05.2017.
 */
@Component({
    template: `
        <div>
            <div class="back side"></div>
            <div class="left side"></div>
            <div class="right side"></div>
            <div class="top side"></div>
            <div class="bottom side"></div>
            <div class="front side"></div>
        </div>
    `,
    moduleId: module.id,
    styleUrls: ['./logo-cube.component.scss']
})
export class LogoCubeComponent {

}
