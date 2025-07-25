class Apierror extends Error{
    constructor(
        statuscode,
        message = "something went wrong",
        error,
        stack
    ){
        super(message);
        this.statuscode = statuscode;
        this.data = null
        this.error = error;
        this.message = message;
        this.success = false;

         if (stack){
        this.stack = stack;
    } else{
        Error.caputureStackTrace(this,this.constructor)
    }
    }


}

export {Apierror}