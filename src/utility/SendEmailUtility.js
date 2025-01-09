const nodemailer=require('nodemailer')

const SendEmailUtility=async (EmailTo,EmailText,EmailSub)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "nmshakib5@gmail.com",
            pass: "mgqz eteg zali yzcl",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOption={
        from:`Mern Ecommerce <nmshakib5@gmail.com>`,
        to:EmailTo,
        subject:EmailSub,
        text:EmailText
    }

    return await transporter.sendMail(mailOption)
}

module.exports=SendEmailUtility;
