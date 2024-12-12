const verifyEmailTemplate = ({name, url}) => {
    return `
        <p>Dear ${name},</p>
        <p>Thank you for register BikzIK.</p>
        <a href=${url} style="color:blue; margin-top:10px; padding:50px;">
            Verify Email
        </a>
    `;
};

export default verifyEmailTemplate;