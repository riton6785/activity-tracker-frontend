import {DefaultSession} from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        access_token: string;  // access token is not there by default i USER interface so we override it to add aceess_token
    }
    interface Session {  //access_token and id is not there default in user session so added here by overriding it 
        user: {
            access_token: string;
            id: string | number
        } & DefaultSession["user"];
  }
}


// Access token and id is not there default on jwt so we extended the default jwt type
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token: string;
    id: string | number;
  }
}
