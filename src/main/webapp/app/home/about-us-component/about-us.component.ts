/**
 * Created by Dmitrij on 05.05.2017.
 */
import {Component} from "@angular/core";
declare var google: any;

interface Department {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    lat: number;
    lng: number;
    isActive: boolean;
    label: string;
}

@Component({
    selector: 'about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss'],
    moduleId: module.id
})
export class AboutUsComponent {

    departments: Department[] = [
        {
            name: 'ГОЛОВНИЙ ОФІС',
            address: 'м.Нововолинськ, 6-р. Шевченка,37',
            phoneNumber: '(03344) 3-12-76, (097) 536-50-83',
            email: 'devizion@ukr.net',
            lat: 50.731731,
            lng: 24.155610,
            isActive: true,
            label: 'M'
        }, {
            name: 'ФІЛАЛ',
            address: 'м.Володимир-Волинський, вул. Ковельска, 29',
            phoneNumber: '(03342) 3-81-71, (097) 296-45-50',
            email: '',
            lat: 50.848014,
            lng: 24.320563,
            isActive: false,
            label: 'F'
        }
    ];


    lng: number = this.departments[0].lng;
    lat: number = this.departments[0].lat;

    goToDepartment(dep: Department) {
        let isActive = !dep.isActive;
        this.departments.forEach((dep) => dep.isActive = false);
        dep.isActive = isActive;
        this.lng = dep.lng;
        this.lat = dep.lat;
    }


}
