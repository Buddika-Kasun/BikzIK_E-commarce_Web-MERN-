const isAdmin = (role) => {
    if (role === 'ADMIN') {
        return true;
    }
    return false;
}

export default isAdmin;