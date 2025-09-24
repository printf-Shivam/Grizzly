package com.ecommerce.backend.Exception;

public class ResorceNotFoundEx extends RuntimeException{

    public ResorceNotFoundEx(String s){
        super(s);
    }
    public ResorceNotFoundEx(String s, Throwable cause){
        super(s, cause);
    }
}
