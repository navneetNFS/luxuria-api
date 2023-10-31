module.exports.creteUserEmailer = () => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Confirmation</title>
</head>

<body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
<table style="width: 100%;height: 100vh;padding: 15px;">
    <tr>
        <td>
            <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                            href="javascript: void(0)">Luxuria</a></td>
                </tr>
                <tr>
                    <td style="padding-top: 25px;">
                        <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Thank you for interested in Luxuria</h1>
                        <p
                            style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 10px;color: #a9a9a9;">We are happy to have you. Please verify your account by clicking on this link</p>
						<p style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;"><a href="javascript: void(0)" style="color: #2f19d5;text-decoration: underline;">Link Here</a></p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Didn't sign up for
                        Luxuriya? <a href="javascript: void(0)">Let us Know</a></td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>

</html>`
}

module.exports.loginDetectionEmailer = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Detected</title>
    </head>
    
    <body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
    <table style="width: 100%;height: 100vh;padding: 15px;">
        <tr>
            <td>
                <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                    cellpadding="0">
                    <tr>
                        <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                                href="javascript: void(0)">Luxuria</a></td>
                    </tr>
                    <tr>
                        <td style="padding-top: 25px;">
                            <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">You are successfully logined</h1>
                            <p
                                style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 10px;color: #a9a9a9;">
                                You are just login to new device.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Didn't sign up for
                            Luxuriya? <a href="javascript: void(0)">Let us Know</a></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    
    </body>
    
    </html>`
}

module.exports.deleteAccountEmailer = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Account</title>
    </head>
    
    <body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
    <table style="width: 100%;height: 100vh;padding: 15px;">
        <tr>
            <td>
                <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                    cellpadding="0">
                    <tr>
                        <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                                href="javascript: void(0)">Luxuria</a></td>
                    </tr>
                    <tr>
                        <td style="padding-top: 25px;">
                            <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Your Account Delete Successfully</h1>
                            <p
                                style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 10px;color: #a9a9a9;">
                                We found you just deleted your account , our representative will call you within 24 hours</p>
                            <p style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;"><a href="javascript: void(0)" style="color: #2f19d5;text-decoration: underline;">Link Here</a></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Didn't sign up for
                            Luxuriya? <a href="javascript: void(0)">Let us Know</a></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    
    </body>
    
    </html>`
}

module.exports.verificationUserEmailer = (otp_digit) => {
    const [one, two, three, four, five, six] = otp_digit
    return `<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Confirmation</title>
</head>

<body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
<table style="width: 100%;height: 100vh;padding: 15px;">
    <tr>
        <td>
            <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                            href="javascript: void(0)">Luxuria</a></td>
                </tr>
                <tr>
                    <td style="padding-top: 25px;">
                        <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Please confirm your email
                            address</h1>
                        <p
                            style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">
                            Thanks for interested in Luxuria. We are happy to have you. Please verify this 6 digit
                            otp for succesfully sign up.</p>
                        <p
                            style="text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;">
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${one}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${two}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${three}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${four}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${five}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${six}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Didn't sign up for
                        Luxuriya? <a href="javascript: void(0)">Let us Know</a></td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>

</html>`
}

module.exports.welecomeUserVerificationEmailer = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Luxuria</title>
    </head>
    
    <body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
        <table style="width: 100%;height: 100vh;padding: 15px;">
            <tr>
                <td>
                    <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                        cellpadding="0">
                        <tr>
                            <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                                    href="javascript: void(0)">Luxuria</a></td>
                        </tr>
                        <tr >
                            <td style="padding-top: 25px;">
                                <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Welcome to Luxuria</h1>
                                <p style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">Thanks for signing up to Luxuria. We are happy to have you.</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Contact us in case you have query <a href="javascript: void(0)">Link Here</a></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    
    </body>
    
    </html>`
}

module.exports.resetPasswordOtpEmailer = (otp_digit) => {
    const [one, two, three, four, five, six] = otp_digit
    return `<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Password</title>
</head>

<body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
<table style="width: 100%;height: 100vh;padding: 15px;">
    <tr>
        <td>
            <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                            href="javascript: void(0)">Luxuria</a></td>
                </tr>
                <tr>
                    <td style="padding-top: 25px;">
                        <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Reset Password</h1>
                        <p
                            style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">We have shared you an 6 digit otp for reset you password. this otp is valid for 30 mins</p>
                        <p
                            style="text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;">
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${one}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${two}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${three}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${four}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${five}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${six}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Contact us in case you have query <a href="javascript: void(0)">Link Here</a></td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>

</html>`
}

module.exports.setPasswordEmailer = () => {
    return ` 
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
    </head>
    
    <body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
        <table style="width: 100%;height: 100vh;padding: 15px;">
            <tr>
                <td>
                    <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                        cellpadding="0">
                        <tr>
                            <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                                    href="javascript: void(0)">Luxuria</a></td>
                        </tr>
                        <tr >
                            <td style="padding-top: 25px;">
                                <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Reset Password</h1>
                                <p style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">Your password is successfully reseted please Re Login</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Contact us in case you have query <a href="javascript: void(0)">Link Here</a></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    
    </body>
    
    </html>`
}

module.exports.verifyForgotPasswordOtpEMailer = (otp_digit) => {
    const [one, two, three, four, five, six] = otp_digit
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Forgot Paswword</title>
</head>

<body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
<table style="width: 100%;height: 100vh;padding: 15px;">
    <tr>
        <td>
            <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                            href="javascript: void(0)">Luxuria</a></td>
                </tr>
                <tr>
                    <td style="padding-top: 25px;">
                        <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Please Verify OTP</h1>
                        <p
                            style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">
                            DOnt worry you can change this password by verify this 6 digit otp for succesfully change password.</p>
                        <p
                            style="text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;">
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${one}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${two}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${three}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${four}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${five}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${six}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Didn't sign up for
                        Luxuriya? <a href="javascript: void(0)">Let us Know</a></td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>

</html>
    `
}

module.exports.rightsAssigned = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation</title>
    </head>
    
    <body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
    <table style="width: 100%;height: 100vh;padding: 15px;">
        <tr>
            <td>
                <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                    cellpadding="0">
                    <tr>
                        <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                                href="javascript: void(0)">Luxuria</a></td>
                    </tr>
                    <tr>
                        <td style="padding-top: 25px;">
                            <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Rights Given</h1>
                            <p
                                style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 10px;color: #a9a9a9;">Admin given rights to you to access these rights in website.</p>
                            <ul style="max-width: 75px;margin: 0 auto 10px;padding-left: 0;font-size: 13px;color: #52a8bd;">
                                <li style="margin-bottom: 5px;">Dashboard</li>
                                <li style="margin-bottom: 5px;">Category</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Didn't sign up for
                            Luxuriya? <a href="javascript: void(0)">Let us Know</a></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </body>
    </html>
    `
}