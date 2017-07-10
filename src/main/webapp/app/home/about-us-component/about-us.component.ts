/**
 * Created by Dmitrij on 05.05.2017.
 */
import {Component, Input} from "@angular/core";
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
    searchQuery: string;
}

@Component({
    selector: 'about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss'],
    moduleId: module.id
})
export class AboutUsComponent {
    @Input('showMap')
    showMap: boolean = true;

    departments: Department[] = [
        {
            name: 'ГОЛОВНИЙ ОФІС',
            address: 'м.Нововолинськ, 6-р. Шевченка,37',
            phoneNumber: '(03344) 3-12-76, (097) 536-50-83',
            email: 'devizion@ukr.net',
            lat: 50.731731,
            lng: 24.155610,
            isActive: true,
            label: 'M',
            searchQuery: 'Міська Друкарня Нововолинськ Україна'
        }, {
            name: 'ФІЛАЛ',
            address: 'м.Володимир-Волинський, вул. Ковельска, 29',
            phoneNumber: '(03342) 3-81-71, (097) 296-45-50',
            email: 'devizion@ukr.net',
            lat: 50.848014,
            lng: 24.320563,
            isActive: false,
            label: 'F',
            searchQuery: 'Міська Друкарня Володимир Волинський Україна'
        }
    ];


    lng: number = this.departments[0].lng;
    lat: number = this.departments[0].lat;

    goToDepartment(dep: Department) {
        this.departments.forEach((dep) => dep.isActive = false);
        dep.isActive = true;
        this.lng = dep.lng;
        this.lat = dep.lat;
    }

    openDepartmentLink(department: Department) {
        // If it's an iPhone..
        if ((navigator.platform.indexOf("iPhone") != -1)
            || (navigator.platform.indexOf("iPod") != -1)
            || (navigator.platform.indexOf("iPad") != -1))
            window.open(`geo:0,0?q=${department.searchQuery}`);
        else
            window.open(`http://maps.google.com/maps?q=${department.searchQuery}`);
    }

}
