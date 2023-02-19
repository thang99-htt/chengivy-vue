import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path:"/admin",
        component: () => import("../components/back/layouts/Layout.vue"),
        meta: {
            authenticatedAdmin: true
        },
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
                meta: {
                    description: 'Vai trò',
                },
            },
            {
                path: "roles/:id",
                name: "role.edit",
                component: () => import("@/views/back/roles/RoleEdit.vue"),
                props: true,
            },
            {
                path: "roles/add",
                name: "role.add",
                component: () => import("@/views/back/roles/RoleAdd.vue"),
            },   
            {
                path: "categories",
                name: "category",
                component: () => import("../views/back/categories/Category.vue"),
                meta: {
                    description: 'Danh mục',
                }
            },
            {
                path: "categories/:id",
                name: "category.edit",
                component: () => import("@/views/back/categories/CategoryEdit.vue"),
                props: true,
            },
            {
                path: "categories/add",
                name: "category.add",
                component: () => import("@/views/back/categories/CategoryAdd.vue"),
            },   
            {
                path: "products",
                name: "product",
                component: () => import("../views/back/products/Product.vue"),
                meta: {
                    description: 'Sản phẩm',
                }
            },
            {
                path: "products/view/:id",
                name: "product.view",
                component: () => import("@/views/back/products/ProductView.vue"),
                props: true,
            },
            {
                path: "products/:id",
                name: "product.edit",
                component: () => import("@/views/back/products/ProductEdit.vue"),
                props: true,
            },
            {
                path: "products/add",
                name: "product.add",
                component: () => import("@/views/back/products/ProductAdd.vue"),
            }, 
        ]
    },
    {
        path: "/admin/login",
        name: "login.admin",
        component: () => import("../views/back/auth/Login.vue"),
        meta: {
            authenticatedAdmin: false
        }
    },
    {
        path:"/",
        component: () => import("../components/front/layouts/Layout.vue"),
        meta: {
            authenticated: false
        },
        children: [
            {
                path: "/:pathMatch(.*)*",
                name: "notfound",
                component: () => import("@/views/NotFound.vue"),
            },
            {
                path: "home",
                name: "home",
                component: () => import("../views/front/Home.vue"),                
            },
            {
                path: "products/:url",
                name: "product.category",
                component: () => import("@/views/front/products/Product.vue"),
                props: true,
            },
            {
                path: "products/detail/:id",
                name: "product.detail",
                component: () => import("@/views/front/products/ProductDetail.vue"),
                props: true,
            },
            {
                path: "login",
                name: "login",
                component: () => import("../views/front/auth/Login.vue"),
            },
            {
                path: "register",
                name: "register",
                component: () => import("../views/front/auth/Register.vue"),
            },
            
        ]
    },
    {
        path:"/",
        component: () => import("../components/front/layouts/Layout.vue"),
        meta: {
            authenticated: true
        },
        children: [
            {
                path: "profiles",
                name: "profile",
                component: () => import("@/views/front/profiles/Profile.vue"),
            },
            {
                path: "cart",
                name: "cart",
                component: () => import("@/views/front/carts/Cart.vue"),
            },
            {
                path: "checkout",
                name: "checkout",
                component: () => import("@/views/front/checkouts/Checkout.vue"),
            },
            
        ]
    },
        
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const adminAuthenticated = localStorage.getItem('tokenAdmin') ? true : false;
    const userAuthenticated = localStorage.getItem('token') ? true : false;

    if (to.meta.authenticated && !userAuthenticated) {
        next({ name: 'login'});
    } else if (to.meta.authenticatedAdmin && !adminAuthenticated) {
        next({ name: 'login.admin'});
    } else {
        next();
    }
    
    
});
export default router;