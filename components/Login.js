import { Api } from "../api.js";

class Login { 

    constructor() {
        this.main = document.querySelector("main");
        this.lista = [];
        this.init();
        this.api = new Api();
        this.main.addEventListener("click",this.mainclk);
    }
    init = () => {
        this.main.innerHTML = ``;
        this.main.innerHTML = `
        <form action="" id="frmnewstud">

        <h1>Login Form</h1>
        
        <div class="divnews">
            <label for="name">Email Address</label>
            <input type="email" name="name" id="name">

        </div>
        <div class="divnews">
            <label for="pass">Password</label>
            <input type="password" name="pass" id="pass">

        </div>

        <button id="btn_log_login">Login</button>
        <button id="btn_log_cancel">Cancel</button>
    </form>        
        
         `;
    }

    loadStudents = async () => {
        try {
            this.lista= await this.api.getAllStudents();
                      
        } catch (e) {
            throw new Error(e);
        }
    }

    checkPass = (n, p) => {
        
        let pers = this.lista.filter(a => a.email == n && a.pass == p);
        if (pers.length==1) {
            alert("elsteee");
        } else {
            alert("nu-i");
        }
    }

    mainclk = async (e) => {
        e.preventDefault();
        let elem = e.target;
        if (elem.id == "btn_log_login") {
            let peml = document.querySelector("#name").value;  
            let ppas = document.querySelector("#pass").value;
            await this.loadStudents();
             let nr = this.lista.filter(a => a.name.includes(name));
            this.checkPass(peml, ppas);
        }

    }


}

export { Login };