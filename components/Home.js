import { Api } from "../api.js";
import { NewStudent } from "./NewStudent.js";
import { Update } from "./Update.js";


class Home{

    constructor(){
        this.main = document.querySelector("main");
        this.listaStud = [];
        this.api = new Api();
        this.lastid = 0;
        this.name = "";
        this.address = "";
        this.email = "";
        this.initMain();
        this.main.addEventListener("click", (e) => {
            this.mainClick(e);
        })
        
    }

    initMain=()=>{
        this.main.innerHTML = '';
        this.main.innerHTML=`
        <div id="home">
            <form action="" id="frmhome">
            <div id="tools">
            <div id="filter">
                <label for="selname">Filtrati dupa nume</label>
                <input type="text" name="selname" id="selname">

            </div>
            <div id="navi">
                <img src="/image/filter-svgrepo-com.svg" id="btnfilt" alt="">
                <img src="/image/add-svgrepo-com.svg" id="btnadd" alt="">
                <img src="/image/update-arrow-svgrepo-com.svg" id="btnupd" alt="">
                <img src="/image/delete-svgrepo-com.svg" id="btndel" alt="">

            </div>

        </div>
           
                <table>
                </table>
            

            </form>
        </div>        
        `;
        this.mkTable();
    }

    mkTable = async () => {
        let tab = document.querySelector("table");
        let tabcont = `
        <thead>
        <tr>
            <th scope="col">Nr crt</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Email</th>
        </tr>
        </thead>
        `;
        let txt= await this.getTableRows();
        console.log(txt);
        tabcont += txt;
        tab.innerHTML = tabcont;
    }

    getTableRows = async () => {
        try {
            this.listaStud =await this.api.getAllStudents();
            let rows = ``;
            let cnt = 0;

            this.listaStud.forEach(s => {
                rows += `
                <tr>
                <th scope="row">${++cnt}</th>
                <td>${s.name}</td>
                <td>${s.address}</td>
                <td>${s.email}</td>
                <td id="rid">${s.id}</td>
            </tr>
            `;         
            });
            return rows;    

        } catch (e) {
            throw new Error(e);
        }
    }


    mkTableFromList = (lista) => {
        let tab = document.querySelector("table");
        let tabcont = `
        <thead>
        <tr class="brow">
            <th scope="col">Nr crt</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Email</th>
                      
        </tr>
        </thead>
        `;
        let rows = ``;
        let cnt = 0;
        lista.forEach(s => {
            rows += `
            <tr >
            <th scope="row">${++cnt}</th>
            <td>${s.name}</td>
            <td>${s.address}</td>
            <td>${s.email}</td>
            <td id="rid">${s.id}</td>
        </tr>
        `;         
        });

        tabcont += rows;
        tab.innerHTML = tabcont;
    }

    newStudent = async (name, address, email) => {
        console.log("in newStudent");
        try {
            let response = await this.api.addStudent({ name, address, email });
            console.log(response.json());
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
    }

    filterStud = async (sname) => {
        try {
            let response = await this.api.filterName(sname);
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
        
    }

    
    delSt = async () => {
        try {
            let resp = this.api.deleteStudent(this.lastid);
            return response.json();
        } catch (e) {
            throw new Error(e);
        }    
    }

    mainClick = async (e) => {
        let elem = e.target;
        let eId = elem.id;
        let pn = elem.parentNode.parentNode;
        console.log(pn.tagName);
        switch (true) {
            case eId == "btnadd":
                console.log("am apasat add");
                let ns = new NewStudent();
                break;
            case eId == "btnfilt":
                console.log("am apasat pe filtrare");
                let vf = document.querySelector("#selname");
                let lista = await this.api.filterName(vf.value);
                this.mkTableFromList(lista);
                break;
            case eId == "btnupd":
                let id = this.lastid;
                let name = this.name;
                let address = this.address;
                let email = this.email;
                let up = new Update({ id, name, address, email });
               
                break;

            case eId == "btndel":
                let r = this.delSt();
                this.initMain();
                break;
            
            case pn.tagName == "TBODY":
                let chld = elem.parentNode.children;
                this.lastid = chld[4].textContent;
               // this.lastid = id;
                this.name =chld[1].textContent;
                this.address = chld[2].textContent;
                this.email = chld[3].textContent;
                //let up = new Update({ id, name, address, email });
                break;
        
        }


    }
}

export { Home };