const { createApp } = Vue;

createApp({
    data() {
        return {
            nameModel: "",
            emailModel: "",
            messageModel: ""
        }
    },
    created() {
        
    },methods: {
        captureData() {
            console.table({
                Name: this.nameModel,
                Mail: this.emailModel,
                Message: this.messageModel
            });

            // Muestro los datos cargados en pantalla
            alert("==== SENT DATA ==== \n -Name: " + this.nameModel + " \n -e-mail: " 
            + this.emailModel + "\n -Message: " + this.messageModel);

            // Reseteo los valores para que se vacíe el formulario
            this.nameModel = "";
            this.emailModel = "";
            this.messageModel = "";
        }
        // alert(JSON.stringify(obj))   para que no muestre (Object object)
    }

}).mount("#app");