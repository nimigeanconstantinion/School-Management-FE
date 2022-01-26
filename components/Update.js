
class Update{

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
        <form action="" id="frmupdtud">

            <h1>Update Student</h1>
            
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

            <button id="btn_upds_submit">Update Info</button>
            <button id="btn_upds_cancel">Cancel</button>
        </form>        
        
        `;
    }

}

export { Update };