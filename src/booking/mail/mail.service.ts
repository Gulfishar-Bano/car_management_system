import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService{

    constructor(
        private readonly mailService:MailerService
    ){}

    async SendBookingConfirmation(to:string, from:string,context:any){
      
        try{
        await this.mailService.sendMail({
            to,
            from,
            template:'booking-confirmation',
            context
        })
        return {success:true};
        }
        catch(error){
          console.log("error in sending mail");
          return {success:false,error}
        }
    }


}