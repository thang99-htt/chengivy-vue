import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path:"/admin",
        component: () => import("../components/back/layouts/Layout.vue"),
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("../views/back/Dashboard.vue"),
            },
            {
                path: "tables",
                name: "table",
                component: () => import("../views/Tables.vue"),
                meta: {description: 'Overview of environment'}
            },
            {
                path: "roles",
                name: "role",
                component: () => import("../views/back/roles/Role.vue"),
                meta: {description: 'Vai trò'}
            },
            {
                path: "roles/:id",
                name: "role.edit",
                component: () => import("@/views/back/roles/RoleEdit.vue"),
                props: true
            },
            {
                path: "roles/add",
                name: "role.add",
                component: () => import("@/views/back/roles/RoleAdd.vue"),
                props: true
            },   
            {
                path: "categories",
                name: "category",
                component: () => import("../views/back/categories/Category.vue"),
                meta: {description: 'Danh mục'}
            },
            {
                path: "categories/:id",
                name: "category.edit",
                component: () => import("@/views/back/categories/CategoryEdit.vue"),
                props: true
            },
            {
                path: "categories/add",
                name: "category.add",
                component: () => import("@/views/back/categories/CategoryAdd.vue"),
                props: true
            },   
            {
                path: "products",
                name: "product",
                component: () => import("../views/back/products/Product.vue"),
                meta: {description: 'Sản phẩm'}
            },
            {
                path: "products/view/:id",
                name: "product.view",
                component: () => import("@/views/back/products/ProductView.vue"),
                props: true
            },
            {
                path: "products/:id",
                name: "product.edit",
                component: () => import("@/views/back/products/ProductEdit.vue"),
                props: true
            },
            {
                path: "products/add",
                name: "product.add",
                component: () => import("@/views/back/products/ProductAdd.vue"),
                props: true
            }, 
        ]
    },
    {
        path:"/",
        component: () => import("../components/front/layouts/Layout.vue"),
        children: [
            {
                path: "/:pathMatch(.*)*",
                name: "NotFound",
                component: () => import("@/views/NotFound.vue"),
            },
            {
                path: "home",
                name: "home",
                component: () => import("../views/front/Home.vue"),
                beforeEnter: (to, from, next) => {
                    const isAuthenticated = localStorage.getItem('token') ? true : false;
                    if(to.name !== 'login' && !isAuthenticated)
                        next({ name: 'login'})
                    else next();
                }
            },
            {
                path: "products/:url",
                name: "product.category",
                component: () => import("@/views/front/products/Product.vue"),
                props: true
            },
            {
                path: "products/detail/:id",
                name: "product.detail",
                component: () => import("@/views/front/products/ProductDetail.vue"),
                props: true
            },
            {
                path: "login",
                name: "login",
                component: () => import("../views/front/auth/Login.vue"),
                beforeEnter: (to, from, next) => {
                    const isAuthenticated = localStorage.getItem('token') ? true : false;
                    if(to.name == 'login' && isAuthenticated)
                        next({ name: 'home'})
                    else next();
                }
            },
            {
                path: "register",
                name: "register",
                component: () => import("../views/front/auth/Register.vue")
            },
            {
                path: "admin/login",
                name: "login.admin",
                component: () => import("../views/back/auth/Login.vue"),
            },
        ]
    },
        
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;