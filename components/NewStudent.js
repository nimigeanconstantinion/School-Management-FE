import { Api } from "../api.js";
import { Home } from "./Home.js";

class NewStudent{
    constructor() {
        this.main = document.querySelector("main");
        this.api = new Api();
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

            <h1>New Student</h1>
            
            <div class="divnews">
                <label for="name">Full Name</label>
                <input type="text" name="name" id="name">
    
            </div>
            <div class="divnews">
                <label for="addr">Address</label>
                <input type="text" name="addr" id="addr">

            </div>
            <div class="divnews">
                <label for="email">Email</label>
                <input type="email" name="email" id="email">

            </div>

            <button id="btn_ns_submit">Create New Student</button>
            <button id="btn_ns_cancel">Cancel</button>
        </form>        
        
        `;
    }

    checkErr = () => {
        let name = document.querySelector("#name");
        let addr = document.querySelector("#addr");
        let em = document.querySelector("#email");
        if (name.value == "") {
            this.errvect[0] = 1;
        }
        if (addr.value == "") {
            this.errvect[1] = 1;
        }
        if (em.value == "") {
            this.errvect[2] = 1;
        }
        
    }

    mkDivErr = () => {
        let errdiv = document.createElement("div");
        errdiv.id = "diverr";
        let p = document.createElement("p");
        if (this.errvect[0] == 1) {
            p.textContent = "Name can't be empty!!!";
            errdiv.appendChild(p);
        }
        if (this.errvect[1] == 1) {
            p = document.createElement("p");
            p.textContent = "Address can't be empty!!!";
            errdiv.appendChild(p);
        }
        if (this.errvect[2] == 1) {
            p = document.createElement("p");
            p.textContent = "Email can't be empty!!!";
            errdiv.appendChild(p);
        }

        return errdiv;
    }

    addS= async () => {
        try {
            let name = document.querySelector("#name").value;
            let address = document.querySelector("#addr").value;
            let email = document.querySelector("#email").value;
            let student = {};
            student.name = name;
            student.address = address;
            student.email = email;
            let response = await this.api.addStudent(student);
            return response.json();

        } catch (e) {
            throw new Error(e);
        }
    }

    clikEvent = (e) => {

        e.preventDefault();
        let clk = e.target;
        
        switch (true) {
            case clk.id == "btn_ns_submit":
                console.log("deci");
                this.errvect = [0, 0, 0];
                this.checkErr();
                console.log(this.errvect)
                if (this.errvect.includes(1)) {
                    let erd = this.mkDivErr();
                    

                    this.main.appendChild(erd);
                    setTimeout(() => {
                        erd.style.transition = "opacity 3s";
              
                        erd.style.opacity = 0;
                        
                    }, 200);
                    setTimeout(function () {
                    
                        erd.style.display = "none";
                        erd.remove();
                      }, 3001);
 
                } else {
                    this.addS();
                    let h = new Home();

                }
                break;
            case clk.id == "btn_ns_cancel":
                let h = new Home();
                break;            

        }
        // if (clk.id == "btn_ns_submit") {
             
        // }
    }
}

export { NewStudent };