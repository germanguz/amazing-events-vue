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
            // Sweetalert2
            Swal.fire({
                icon: 'success',
                title: 'Resume',
                background: '#1e2028',
                color: '#838383',
                html: `<b>Name:</b> ${this.nameModel} <br><br>
                <b>E-mail:</b> ${this.emailModel} <br><br>
                <b>Message:</b> ${this.messageModel}`,
                confirmButtonColor: '#ff3f01',
              })

            // Reseteo los valores para que se vacíe el formulario
            this.nameModel = "";
            this.emailModel = "";
            this.messageModel = "";
        }
    }

}).mount("#app");