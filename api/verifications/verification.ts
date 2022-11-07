import { User } from "api/user/user.interface";
var NodeCache = require("node-cache");
import { users } from "../database/users";
var md5 = require('blueimp-md5');

export abstract class Verification {
    abstract verify(user: User): boolean;
}

export class VerifyAuth extends Verification {
    verify(user: User): boolean {
        let ok = false;
        users.forEach( u => {
            if (u.userName == user.userName && u.password == md5(user.password)) {
                ok = true;
            }
        });
        return ok;
    }
}

export class VerifyBruteForce extends Verification {
    forceBruteCounter: number;
    constructor() {
        super();
        this.forceBruteCounter = 0;
    }

    verify(): boolean {
        this.increaseForceBruteCounter();
        if (this.forceBruteCounter > 3) return false;
        else return true;
    }

    increaseForceBruteCounter() {
        this.forceBruteCounter += 1;
    }
}

export class VerifyCache extends Verification {
    myCache;

    constructor() {
        super();
        this.myCache = new NodeCache({ stdTTL: 10 });
    }
    verify(): boolean | any {
        return this.myCache.has("result");
    }

    getMyCache(): any {
        return this.myCache;
    }
    
}

export class VerifySanitize extends Verification {
    verify(user: User): boolean {
        /**  este metodo no tiene sentido ya que typrescript es un lenguaje tipado,
         y el modelo de User define que el userName y password son String siempre,
         entonces estas condiciones son redundantes */

        // if (typeof user.password != String || typeof user.userName != String ) return false;
        return true;
    }
    
}

export class VerificationCenter {
    verifyAuth : VerifyAuth;
    verifyBruteForce : VerifyBruteForce;
    verifySanitize : VerifySanitize;
    verifyCache: VerifyCache;
    verificationModes: Map<string, Verification>;

    constructor() {
        this.verifyAuth = new VerifyAuth();
        this.verifyBruteForce = new VerifyBruteForce();
        this.verifySanitize = new VerifySanitize();
        this.verifyCache = new VerifyCache();

        this.verificationModes = new Map();
        this.verificationModes.set("authorization", this.verifyAuth);
        this.verificationModes.set("bruteForce", this.verifyBruteForce);
        this.verificationModes.set("sanitize", this.verifySanitize);
        this.verificationModes.set("cache", this.verifySanitize);  

    }
    
}