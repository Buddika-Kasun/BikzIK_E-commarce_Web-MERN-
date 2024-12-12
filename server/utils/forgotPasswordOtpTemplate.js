const forgotPasswordOtpTemplate = ({ name, otp, expireTime }) => {

    // Format the expiry time for user-friendly display in the email template
    const formattedExpireTime = expireTime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
  

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Password Reset OTP</title>
        <style>
          /* Basic styling for email clients */
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
          }
  
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f2f2f2;
          }
  
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
  
          .otp-code {
            background-color: #fff;
            padding: 10px;
            border-radius: 5px;
            font-size: 20px;
            letter-spacing: 4px;
            font-weight: bold;
            text-align: center;
          }
  
          .footer {
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset</h1>
          </div>
  
          <p>Dear ${name},</p>
  
          <p>You've requested a password reset. Please use the following OTP code to reset your password:</p>
  
          <div class="otp-code">
            ${otp}
          </div>
  
          <p>This OTP is valid for ${formattedExpireTime}.</p>
  
          <p>Please enter this OTP on the Binkeyit website to proceed with resetting your password.</p>
  
          <div class="footer">
            Thanks,<br>
            The Binkeyit Team
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  export default forgotPasswordOtpTemplate;