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
                children: [
                    {
                        path: "overview",
                        name: "product",
                        component: () => import("../views/admin/products/Product.vue"),
                        meta: {
                            description: 'Sản phẩm',
                            permissionID: 40
                        }
                    },
                    {
                        path: "inventory",
                        name: "inventory",
                        component: () => import("../components/admin/products/ProductInventory.vue"),
                        meta: {
                            description: 'Tồn kho',
                            permissionID: 40
                        }
                    },
                    {
                        path: "sale",
                        name: "sale",
                        component: () => import("../components/admin/products/ProductSale.vue"),
                        meta: {
                            description: 'Giảm giá',
                            permissionID: 40
                        }
                    },
                    {
                        path: "hidden",
                        name: "hidden",
                        component: () => import("../components/admin/products/ProductHidden.vue"),
                        meta: {
                            description: 'Sản phẩm ẩn',
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
                        path: "payment-voucher",
                        name: "payment-voucher",
                        component: () => import("../views/admin/imports/PaymentVoucher.vue"),
                        meta: {
                            description: 'Phiếu chi',
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
                        path: "stock-received-docket/add",
                        name: "stock-received-docket.add",
                        component: () => import("../views/admin/imports/StockReceivedDocketAdd.vue"),
                        meta: {
                            description: 'Thêm phiếu nhập',
                            permissionID: 44
                        },
                    },
                    {
                        path: "stock-received-docket/:id",
                        name: "stock-received-docket.edit",
                        component: () => import("../views/admin/imports/StockReceivedDocketEdit.vue"),
                        props: true,
                        meta: {
                            description: 'Chỉnh sửa phiếu nhập',
                            permissionID: 44
                        }
                    },
                    {
                        path: "stock-received-docket/view/:id",
                        name: "stock-received-docket.view",
                        component: () => import("../components/admin/imports/StockReceivedDocketView.vue"),
                        props: true,
                        meta: {
                            description: 'Chi tiết phiếu nhập',
                            permissionID: 44
                        }
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
                name: "order.view",
                component: () => import("@/views/admin/orders/OrderDetail.vue"),
                props: true,
                meta: {
                    description: 'Chi tiết đơn hàng',
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
                path: "vouchers",
                name: "voucher",
                component: () => import("../views/admin/vouchers/Voucher.vue"),
                meta: {
                    description: 'Phiếu khuyến mãi',
                    permissionID: 51
                }
            },
            {
                path: "notifications",
                name: "notification",
                component: () => import("../views/admin/notifications/Notification.vue"),
                meta: {
                    description: 'Thông báo',
                    permissionID: 51
                }
            },
            {
                path: "statisticals",
                children: [
                    {
                        path: "overview",
                        name: "statistical.overview",
                        component: () => import("../views/admin/statisticals/Statistical.vue"),
                        meta: {
                            description: 'Báo cáo, Thống kê',
                            permissionID: 69
                        },
                    },
                    {
                        path: "finance",
                        name: "statistical.finance",
                        component: () => import("../views/admin/statisticals/StatisticalFinance.vue"),
                        meta: {
                            description: 'Hoạt động tài chính',
                            permissionID: 69
                        },
                    },
                    {
                        path: "sell",
                        name: "statistical.sell",
                        component: () => import("../views/admin/statisticals/StatisticalSell.vue"),
                        meta: {
                            description: 'Hoạt động bán hàng',
                            permissionID: 69
                        },
                    },
                    {
                        path: "top-product",
                        name: "statistical.top",
                        component: () => import("../views/admin/statisticals/StatisticalTopProduct.vue"),
                        meta: {
                            description: 'Top nổi bật',
                            permissionID: 69
                        },
                    },
                    {
                        path: "inventory",
                        name: "statistical.inventory",
                        component: () => import("../views/admin/statisticals/StatisticalInventory.vue"),
                        meta: {
                            description: 'Lịch sử tồn kho',
                            permissionID: 69
                        },
                    },
                    {
                        path: "invoice",
                        name: "statistical.invoice",
                        component: () => import("../views/admin/statisticals/StatisticalInvoice.vue"),
                        meta: {
                            description: 'Lịch sử hóa đơn',
                            permissionID: 69
                        },
                    },
                    {
                        path: "return",
                        name: "statistical.return",
                        component: () => import("../views/admin/statisticals/StatisticalReturn.vue"),
                        meta: {
                            description: 'Lịch sử hoàn trả',
                            permissionID: 69
                        },
                    },
                    {
                        path: "trend",
                        name: "statistical.trend",
                        component: () => import("../views/admin/statisticals/StatisticalTrend.vue"),
                        meta: {
                            description: 'Xu hướng bán hàng',
                            permissionID: 69
                        },
                    },
                ]

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