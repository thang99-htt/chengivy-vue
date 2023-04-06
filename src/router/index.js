import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios';
import AuthorizationService from "@/services/admin/authorization.service";

const routes = [
    {
        path:"/admin",
        component: () => import("../components/admin/layouts/Layout.vue"),
        meta: {
            authenticatedAdmin: true
        },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("../views/admin/Dashboard.vue"),
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
                component: () => import("../views/admin/roles/Role.vue"),
                meta: {
                    description: 'Vai trò',
                },
            },
            {
                path: "roles/:id",
                name: "role.edit",
                component: () => import("@/views/admin/roles/RoleEdit.vue"),
                props: true,
            },
            {
                path: "roles/add",
                name: "role.add",
                component: () => import("@/views/admin/roles/RoleAdd.vue"),
            },  
            {
                path: "permissions",
                name: "permission",
                component: () => import("../views/admin/permissions/Permission.vue"),
                meta: {
                    description: 'Quyền',
                },
            },
            {
                path: "permissions/:id",
                name: "permission.edit",
                component: () => import("@/views/admin/permissions/PermissionEdit.vue"),
                props: true,
            },
            {
                path: "permissions/add",
                name: "permission.add",
                component: () => import("@/views/admin/permissions/PermissionAdd.vue"),
            },   
            {
                path: "staffs",
                name: "staff",
                component: () => import("../views/admin/staffs/Staff.vue"),
                meta: {
                    description: 'Nhân viên',
                    permissionId: 3
                },
            },
            {
                path: "staffs/add",
                name: "staff.add",
                component: () => import("@/views/admin/staffs/StaffAdd.vue"),
            },  
            {
                path: "staffs/:id",
                name: "staff.edit",
                component: () => import("@/views/admin/staffs/StaffEdit.vue"),
                props: true,
            },
            {
                path: "authorization",
                name: "authorization",
                component: () => import("../views/admin/authorizations/Authorization.vue"),
                meta: {
                    description: 'Phân quyền',
                },
            },
            {
                path: "categories",
                name: "category",
                component: () => import("../views/admin/categories/Category.vue"),
                meta: {
                    description: 'Danh mục',
                    permissionId: 5
                }
            },
            {
                path: "categories/:id",
                name: "category.edit",
                component: () => import("@/views/admin/categories/CategoryEdit.vue"),
                props: true,
            },
            {
                path: "categories/add",
                name: "category.add",
                component: () => import("@/views/admin/categories/CategoryAdd.vue"),
            },   
            {
                path: "products",
                name: "product",
                component: () => import("../views/admin/products/Product.vue"),
                meta: {
                    description: 'Sản phẩm',
                    permissionId: 6
                }
            },
            {
                path: "products/view/:id",
                name: "product.view",
                component: () => import("@/views/admin/products/ProductView.vue"),
                props: true,
            },
            {
                path: "products/:id",
                name: "product.edit",
                component: () => import("@/views/admin/products/ProductEdit.vue"),
                props: true,
            },
            {
                path: "products/add",
                name: "product.add",
                component: () => import("@/views/admin/products/ProductAdd.vue"),
            }, 
            {
                path: "orders",
                name: "order",
                component: () => import("../views/admin/orders/Order.vue"),
                meta: {
                    description: 'Đơn hàng',
                    permissionId: 7
                }
            },
            {
                path: "orders/:id",
                name: "order.detail",
                component: () => import("@/views/admin/orders/OrderDetail.vue"),
                props: true,
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
        path:"/",
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
                path: "/search",
                name: "search",
                component: () => import("../views/user/products/Search.vue"),                
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
        path:"/",
        component: () => import("../components/user/layouts/Layout.vue"),
        meta: {
            authenticated: true
        },
        children: [
            {
                path: "profiles",
                component: () => import("../components/user/profiles/Profile.vue"),
                children: [
                    {
                        path: "/profiles",
                        name: "profile",
                        component: () => import("@/views/user/profiles/Profile.vue"),
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
            {
                path: "modal",
                name: "modal",
                component: () => import("@/components/Modal.vue"),
                props: true,
            },
        ]
    },
        
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const adminAuthenticated = localStorage.getItem('tokenAdmin') ? true : false;
    const userAuthenticated = localStorage.getItem('tokenUser') ? true : false;
  
    if (to.meta.authenticated && !userAuthenticated) {
      next({ name: 'login'});
    } else if (to.meta.authenticatedAdmin && !adminAuthenticated) {
      next({ name: 'login.admin'});
    } else {
      // Kiểm tra permission nếu có
      if (to.meta.permissionId) {
        const tokenAdmin = localStorage.getItem('tokenAdmin');
        if (tokenAdmin) {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user`, {
              headers: {
                Authorization: `Bearer ${tokenAdmin}`
              }
            });
            const staffId = response.data.id;
            const response1 = await AuthorizationService.getStaff(staffId);
            const permissions = response1.permissions;
            const hasPermission = permissions.some(permission => permission.id === to.meta.permissionId);
            if (!hasPermission) {
              next({ name: 'dashboard' });
              return;
            }
            // Nếu có permission thì tiếp tục điều hướng đến route đích
            next();
          } catch (error) {
            console.error(error);
            next({ name: 'login.admin' });
          }
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