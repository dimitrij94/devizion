import {Subject} from "rxjs";
export class SidenavService{
    public statusSubject:Subject<boolean> = new Subject();
    public status;

    constructor(){
        this.statusSubject.subscribe((status:boolean)=>{
            this.status = status;
        })
    }

    public toggle(){
        this.statusSubject.next(this.status !== true)
    }

}
