import { Injectable } from "@nestjs/common";

@Injectable()
export class ZaposleniSignInDto{
    email:string;
    password:string;
}
