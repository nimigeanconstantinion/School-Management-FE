class Api{

    api = (path,method="GET",body=null) => {
        let url = path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
          
        };

        if(body !=null){
            options.body = JSON.stringify(body);
        }

        return fetch(url,options);
}

    getAllStudents = async () => {
        try {
            let lista = await this.api("http://localhost:8080/api/v1/school");
            return lista.json();
        } catch (e) {
            throw new Error(e);
        }
    }
    addStudent = async (student) => {
        try {
            console.log()
            let response = await this.api("http://localhost:8080/api/v1/school", "POST", student);
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
    }

    updateStudent = async (student) => {
        try {
            let response = await this.api("http://localhost:8080/api/v1/school/"+student.id, "PUT", student);
            return response.json();            
        } catch (e) {
            throw new Error(e);
        }

    }
    
    deleteStudent = async (id) => {
        try {
            let response = await this.api("http://localhost:8080/api/v1/school/"+id, "DELETE");
            return response.json();            
        } catch (e) {
            throw new Error(e);
        }

    }

    filterName = async (fname) => {
        try {
            console.log("http://localhost:8080/api/v1/school/place/" + fname);
            let response = await this.api("http://localhost:8080/api/v1/school/place/"+fname, "GET");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
        
    }
    
}

export { Api };