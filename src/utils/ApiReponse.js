class ApiReponse{
    constructor(statuscode,data,message = sucess){
        this.statuscode = statuscode
        this.data = data,
        this.message = message
        this.sucess = statuscode < 400
    }
}

export {ApiReponse}