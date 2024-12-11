const verifyEmailTemplate = ({name, url}) => {
    return `
        <p>Dear ${name}</p>
        <p>Thank you for register Binkeyit.</p>
        <a href=${url} style="color:white;background-color:blue;margin-top:10px">
            Verify Email
        </a>
    `;
};

export default verifyEmailTemplate;