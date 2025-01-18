import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {

    const socials = [
        {
            name: 'Facebook',
            url: '#',
            icon: <FaFacebook />
        },
        {
            name: 'Instagram',
            url: '#',
            icon: <FaInstagram />
        },
        {
            name: 'LinkedIn',
            url: '#',
            icon: <FaLinkedin />
        }
    ];

    return (
        <footer className='border-t'>
            <div className='container mx-auto py-2 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
                <p>© All Right Reserved 2024.</p>
                <div className='flex items-center gap-4 justify-center text-2xl'>
                    {socials.map((social, index) => (
                        <a
                            key={index} 
                            href={social.url} 
                            target='_blank' 
                            rel='noopener noreferrer' 
                            className='hover:text-green-600'
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;