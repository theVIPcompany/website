import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

try {
    const {email} = await req.json();

    //Create a transporter using SMTP details
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD,
        }
    });

    //Create an e-mail message
    const mailOptions = {
        from: "'The VIP Company'<contactus@thevipcompany.ng>",
        to: `${email}`,
        subject: "Successful Newsletter Subscription",
        html: `<div style="font-family: 'ubuntu', 'verdana'; font-size: 18px">
                    <header style="display: flex; flex-direction: row; background-color: #0F0F0F; color: #FFFFFF; padding: 8px 10px; border-radius: 4px 4px 0 0">Notification</header>
                    <div style="background-color: #F6F6F6; padding: 10px; line-height: 1.5rem; border-radius: 0 0 4px 4px; font-size: 12px">
                        <span>This is a notification that ${email} has been successfully added to the waiting list. Have a nice day.</span> 
                        <br />
                        <br />
                        <strong>Your ViP</strong>
                        <!--<img src="cid:thevipcompany@logo" height="20px" />-->
                    </div>
                </div>`,
        /**attachments: [{
            filename: 'icon.png',
            path: 'https://www.thevipcompany.ng/logo.png',
            cid: 'thevipcompany@logo' //same cid value as in the html img src
        }]**/
    };

    // Send the email
    const info  = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    return NextResponse.json({
        success: true,
        message: "Your subscription has been sent!"
    });
} catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
            success: false,
            message: "Internal server error, please try again",
            Error: error,
        },
        {
            status: 500
        })
    }
}