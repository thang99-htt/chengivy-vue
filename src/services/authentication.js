export default (to, from, next) => {
    if (to.meta.authenticated && localStorage.getItem('token')) {
        return next();
    }
    if (!to.meta.authenticated) {
        return next();
    }
    next('/login');
};