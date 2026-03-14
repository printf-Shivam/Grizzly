package com.ecommerce.backend.Exception;

public class ResourceNotFoundEx extends RuntimeException{

    public ResourceNotFoundEx(String s){
        super(s);
    }
    public ResourceNotFoundEx(String s, Throwable cause){
        super(s, cause);
    }
}
