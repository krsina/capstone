{/* Middleware for properly verify user tokens once they sign in. Helps to ensure useres are authenticated
    before they can access all protected routes within the application
*/}
const supabase = require('../supabaseClient');

const authVerify = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorization.split(' ')[1];
    const { data, error } = await supabase.auth.api.getUser(token);

    if (error || !data) {
        return res.status(401).json({ error: 'Unauthorized' });
    }


    req.user = data;
    next();
}

module.exports = authVerify;
