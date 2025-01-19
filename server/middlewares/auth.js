import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try{
        const token = req.cookies.accessToken || req.header?.authorization?.split(" ")[1]; // ["aaaa","token"]

        if(!token) { console.log("provide token")
            return res.status(401).json({
                message: 'Provide token to access',
                error: true,
                success: false,
            });
        }
        console.log("Toke: ", token);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if(!decoded){console.log("unauthorized")
            return res.status(401).json({
                message: 'Unauthorized access',
                error: true,
                success: false,
            });
        }

        req.userId = decoded.id;

        next();

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

export default auth;