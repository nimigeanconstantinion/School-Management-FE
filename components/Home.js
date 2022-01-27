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
        this.lastcell = "";
        this.main.addEventListener("click", this.mainClick);

        
        this.cells = document.getElementsByClassName(".cell");
      

        this.main.addEventListener("focusout", (e) => {
          

            this.cellUpd(e);
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
                <tr  id="row"}">
                    <th scope="row">${++cnt}</th>
                    <td id="row" class="cell">${s.name}</td>
                    <td id="row" class="cell">${s.address}</td>
                    <td id="row" class="cell">${s.email}</td>
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

    getRowContent = (e) => {
            let elem = e.target;
        
            let rowNode = elem.parentNode;
        
            let chld = rowNode.children;
            this.lastid = chld[4].textContent;
       
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

    cellUpd = (e) => {
        let elem = e.target;

        if (elem.className == "cell") {
            let rowNode = elem.parentNode;
            let chld = rowNode.children;
            this.name = chld[1].textContent;
            this.address = chld[2].textContent;
            this.email = chld[3].textContent;
            this.lastid=chld[4].textContent
            this.updS();                
        }
    }

    updS = async () => {
        let id = this.lastid;
        let name = this.name;
        let address = this.address;
        let email = this.email;
        try {
            let r = await this.api.updateStudent({ id, name, address, email });
            return r.json();
        } catch(e) {
            throw new Error(e);
        }

    }



    delSt = async () => {
        try {
            let resp = await this.api.deleteStudent(this.lastid);
            this.initMain();
            return response.json();
        } catch (e) {
            throw new Error(e);
        }    
    }

    mainClick = async (e) => {
        let elem = e.target;
        let eId = elem.id;
        let pn = elem.parentNode.parentNode;
        console.log(elem.id);
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
            
            case eId == "btndel":
                
               
                try {
                    let r = await this.delSt();
                } catch (e) {
                    throw new Error(e);
                }
                
                break;
            
            case eId == "row":
                
                console.log("aici");
                this.getRowContent(e);
                let elemVal = elem.textContent;
                elem.contentEditable = true;
                break;
        
        
        }


    }




}

export { Home };