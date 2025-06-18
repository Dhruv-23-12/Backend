class Apierror extends Error{
    constructor(
        statuscode,
        message = "something went wrong",
        error,
        statck
    ){
        super(message);
        this.statuscode = statuscode;
        this.data = null
        this.error = error;
        this.message = message;
        this.success = false;

         if (stack){
        this.stack = statck;
    } else{
        Error.caputureStackTrace(this,this.constructor)
    }
    }


}

export {Apierror}