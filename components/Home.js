import { Api } from "../api.js";
import { NewStudent } from "./NewStudent.js";


class Home{

    constructor(){
        this.main = document.querySelector("main");
        this.listaStud = [];
        this.api = new Api();
        
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
                <tr class="row">
                <th scope="row">${++cnt}</th>
                <td>${s.name}</td>
                <td>${s.address}</td>
                <td>${s.email}</td>
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
        <tr>
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
    mainClick =async (e) => {
        let elem = e.target;
        let eId = elem.id;
        
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
            case elem.className=="row":
                console.log("Ati apasat pe un rand");
                break;
        }


    }
}

export { Home };