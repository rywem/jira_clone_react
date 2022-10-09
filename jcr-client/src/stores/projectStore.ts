import { makeAutoObservable } from "mobx";


export default class ProjectStore {
    title = "Hello from mobx";

    constructor() {
        // makeObservable(this, {
        //     title: observable,
        //     setTitle: action
        // })
        makeAutoObservable(this);
    }

    setTitle = () => {        
        this.title = this.title + "!";
    }
}