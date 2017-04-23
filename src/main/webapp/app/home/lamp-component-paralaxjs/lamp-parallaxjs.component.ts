///<reference path='../../../../../../typings/globals/jquery/index.d.ts'/>
/**
 * Created by Dmitrij on 12.04.2017.
 */
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
declare var $:JQueryStatic;

@Component({selector:'lamps-parralax',templateUrl:'./lamp-parallaxjs.component.html', moduleId:module.id})
export class LampParallaxJSComponent  implements AfterViewInit{
    @ViewChild('scene') sceneView:ElementRef;

    ngAfterViewInit(): void {
        //$(this.sceneView.nativeElement)
    }
}
