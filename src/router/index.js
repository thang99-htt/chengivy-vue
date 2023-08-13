import { createWebHistory, createRouter } from "vue-router";
import store from '../vuex';

const routes = [
    {
        path: "/admin",
        component: () => import("../components/admin/layouts/Layout.vue"),
        meta: {
            authenticatedAdmin: true
        },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("../views/admin/Dashboard.vue"),
                meta: {
                    description: 'Dashboard'
                },
            },
            {
                path: "staffs",
                component: () => import("../views/admin/staffs/StaffDefault.vue"),
                children: [
                    {
                        path: "staff-list",
                        name: "staff",
                        component: () => import("../views/admin/staffs/Staff.vue"),
                        meta: {
                            description: 'Nhân viên',
                            permissionID: 23
                        },
                    },
                    {
                        path: "roles",
                        name: "role",
                        component: () => import("../views/admin/staffs/Role.vue"),
                        meta: {
                            description: 'Vai trò',
                            permissionID: 23
                        },
                    },
                ],
            },
            {
                path: "products",
                component: () => import("../views/admin/products/ProductDefault.vue"),
                children: [
                    {
                        path: "list",
                        name: "product",
                        component: () => import("../views/admin/products/Product.vue"),
                        meta: {
                            description: 'Sản phẩm',
                            permissionID: 40
                        }
                    },
                    {
                        path: "category",
                        name: "category",
                        component: () => import("../views/admin/products/Category.vue"),
                        meta: {
                            description: 'Danh mục',
                            permissionID: 32
                        }
                    },
                    {
                        path: "brand",
                        name: "brand",
                        component: () => import("../views/admin/products/Brand.vue"),
                        meta: {
                            description: 'Danh mục',
                            permissionID: 32
                        }
                    },
                ]
            },
            {
                path: "import",
                component: () => import("../views/admin/imports/ImportDefault.vue"),
                children: [
                    {
                        path: "supplier",
                        name: "supplier",
                        component: () => import("../views/admin/imports/Supplier.vue"),
                        meta: {
                            description: 'Nhà cung cấp',
                            permissionID: 44
                        },
                    },
                    {
                        path: "stock-received-docket",
                        name: "stock-received-docket",
                        component: () => import("../views/admin/imports/StockReceivedDocket.vue"),
                        meta: {
                            description: 'Phiếu nhập',
                            permissionID: 44
                        },
                    },
                    {
                        path: "payment-voucher",
                        name: "payment-voucher",
                        component: () => import("../views/admin/imports/PaymentVoucher.vue"),
                        meta: {
                            description: 'Phiếu chi',
                            permissionID: 44
                        },
                    },
                ]

            },
            {
                path: "orders",
                name: "order",
                component: () => import("../views/admin/orders/Order.vue"),
                meta: {
                    description: 'Đơn hàng',
                    permissionID: 55
                }
            },
            {
                path: "orders/:id",
                name: "order.detail",
                component: () => import("@/views/admin/orders/OrderDetail.vue"),
                props: true,
                meta: {
                    description: 'Xem chi tiết Đơn hàng',
                    permissionID: 22
                }
            },
            {
                path: "invoices",
                name: "invoice",
                component: () => import("../views/admin/invoices/Invoice.vue"),
                meta: {
                    description: 'Hóa đơn',
                    permissionID: 22
                }
            },
            {
                path: "reviews",
                name: "review",
                component: () => import("../views/admin/reviews/Review.vue"),
                meta: {
                    description: 'Đánh giá',
                    permissionID: 59
                }
            },
            {
                path: "products/view/:id",
                name: "product.view",
                component: () => import("@/views/admin/products/ProductView.vue"),
                props: true,
                meta: {
                    description: 'Xem Sản phẩm',
                    permissionID: 10
                }
            },
        ]
    },
    {
        path: "/admin/login",
        name: "login.admin",
        component: () => import("../views/admin/auth/Login.vue"),
        meta: {
            authenticatedAdmin: false
        }
    },
    {
        path: "/",
        component: () => import("../components/user/layouts/Layout.vue"),
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
                path: "/",
                name: "home",
                component: () => import("../views/user/Home.vue"),
            },
            {
                path: "search",
                name: "search",
                component: () => import("../views/user/products/Product.vue"),
            },
            {
                path: "products/all",
                name: "product.all",
                component: () => import("@/views/user/products/Product.vue"),
                props: true,
            },
            {
                path: "products/:url",
                name: "product.category",
                component: () => import("@/views/user/products/Product.vue"),
                props: true,
            },
            {
                path: "products/detail/:id",
                name: "product.detail",
                component: () => import("@/views/user/products/ProductDetail.vue"),
                props: true,
            },
            {
                path: "login",
                name: "login",
                component: () => import("../views/user/auth/Login.vue"),
            },
            {
                path: "register",
                name: "register",
                component: () => import("../views/user/auth/Register.vue"),
            },

        ]
    },
    {
        path: "/",
        component: () => import("../components/user/layouts/Layout.vue"),
        meta: {
            authenticated: true
        },
        children: [
            {
                path: "customer",
                component: () => import("../components/user/profiles/Profile.vue"),
                children: [
                    {
                        path: "profiles",
                        name: "profile",
                        component: () => import("@/views/user/profiles/Profile.vue"),
                    },
                    {
                        path: "addresses",
                        name: "address",
                        component: () => import("@/views/user/addresses/Address.vue"),
                    },
                    {
                        path: "purchases",
                        name: "purchase",
                        component: () => import("@/views/user/purchases/Purchase.vue"),
                    },
                    {
                        path: "purchase/:id",
                        name: "purchase.detail",
                        component: () => import("@/views/user/purchases/PurchaseDetail.vue"),
                        props: true,
                    },
                    {
                        path: "favorites",
                        name: "favorite",
                        component: () => import("@/views/user/favorites/Favorite.vue"),
                    },
                ]
            },
            {
                path: "cart",
                name: "cart",
                component: () => import("@/views/user/carts/Cart.vue"),
            },
            {
                path: "checkout",
                name: "checkout",
                component: () => import("@/views/user/checkouts/Checkout.vue"),
            },
        ]
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const getAdmin = store.getters.getAdmin;
    const adminAuthenticated = localStorage.getItem('tokenAdmin') ? true : false;
    const userAuthenticated = localStorage.getItem('tokenUser') ? true : false;

    if (to.meta.authenticated && !userAuthenticated) {
        next({ name: 'login' });
    } else if (to.meta.authenticatedAdmin && !adminAuthenticated) {
        next({ name: 'login.admin' });
    } else {
        // Kiểm tra permission nếu có
        if (to.meta.permissionID) {
            if (getAdmin) {
                const hasPermission = getAdmin.permissionIDs.includes(to.meta.permissionID);
                if (!hasPermission) {
                    next({ name: 'dashboard' });
                    return;
                }
                // Nếu có permission thì tiếp tục điều hướng đến route đích
                next();
            } else {
                next({ name: 'login.admin' });
            }
        } else {
            // Nếu không có permission thì tiếp tục điều hướng đến route đích
            next();
        }
    }
});

export default router;