import { Api } from "../api.js";
import { Home } from "./Home.js";

class Update{

    constructor(stud) {
        this.main = document.querySelector("main");
        this.api = new Api();
        this.student = stud;
        this.errvect = [0, 0, 0];
        
        this.initMain();

        this.main.addEventListener("click", (e) => {
            this.clikEvent(e);
        })
    }

    initMain = () => {
        this.main.innerHTML = ``;
        this.main.innerHTML = `
        <form action="" id="frmnewstud">

            <h1>Update Student</h1>
            
            <div class="divnews">
                <label for="name">Full Name</label>
                <input type="text" name="name" id="name" value="${this.student.name}">
    
            </div>
            <div class="divnews">
                <label for="addr">Address</label>
                <input type="text" name="addr" id="addr" value="${this.student.address}">

            </div>
            <div class="divnews">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="${this.student.email}">

            </div>

            <button id="btn_upds_submit">Update Info</button>
            <button id="btn_upds_cancel">Cancel</button>
        </form>        
        
        `;
    }

    upS = async () => {
        try {
            let id = this.student.id;
            let name = document.querySelector("#name").value;
            let address = document.querySelector("#addr").value;
            let email= document.querySelector("#email").value;

            let response=await this.api.updateStudent({id,name,address,email});
            return response.json();
        } catch (e) {
            throw new Error(e);
        }    
    }

    clikEvent = (e) => {
        e.preventDefault();
        let clk = e.target;
        
        switch (true) {
            case clk.id == "btn_upds_submit":
                let r = this.upS();
                console.log(r);
                let hm = new Home();
                break;
            case clk.id == "btn_upds_cancel":
                let h = new Home();
                break;
        }    
               
    }
}

export { Update };