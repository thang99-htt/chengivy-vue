<template>
    <div class="account-login">
        <form method="POST" action="" class="card login-form">
            <div class="title">
                <h3>ĐĂNG KÝ</h3>
                <p>
                    Quá trình đăng ký chỉ mất chưa đầy một phút nhưng mang lại cho bạn toàn quyền kiểm soát các đơn đặt hàng của mình.
                </p>
            </div>

            <p class="error-feedback" v-if="error" > {{  error }}</p>
            <RegisterForm
                @submit:register="createRegister"
            />

        </form>
    </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue';
import AuthService from "@/services/user/auth.service";

export default {
  components: { 
    RegisterForm 
  },
  data() {
    return {
        error: ''
    }
  },
  methods: {
    async createRegister(form) {
        try {
            await AuthService.register(form).then((response) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
    
                Toast.fire({
                    icon: 'success',
                    title: 'Đăng ký thành công.'
                })
    
                this.$router.push({ name: "login" });
            });
            
        } catch (error) {            
            this.error = error.response.data.message;
            console.log(error);
        }
    },

  },
}
</script>

<style scoped>
.account-login {
  width: 500px;
  margin: 100px auto;
}
.account-login .login-form {
padding: 42px;
border: 1px solid #e6e6e6;
border-radius: 4px;
background-color: #fff;
-webkit-box-shadow: 0 5px 40px #00000008;
box-shadow: 0 6px 40px 6px #f1f1f1;
}
@media (max-width: 767px) {
.account-login .login-form {
  padding: 30px;
}
}
.account-login .login-form .card-body {
padding: 0;
}
.account-login .login-form .title {
margin-bottom: 30px;
}
.account-login .login-form .title h3 {
font-size: 22px;
font-weight: 700;
color: #081828;
margin-bottom: 10px;
}
.account-login .login-form .social-login .btn {
padding: 10px 0;
font-size: 12px;
border-radius: 4px;
border: 1px solid #eee;
display: block;
font-weight: 600;
}
.account-login .login-form .social-login .btn i {
display: inline-block;
margin-right: 4px;
font-size: 15px;
}
@media (max-width: 767px) {
.account-login .login-form .social-login .btn {
  margin: 6px 0;
}
}
.account-login .login-form .social-login .facebook-btn {
border-color: #3b5998;
background-color: transparent;
color: #3b5998;
}
.account-login .login-form .social-login .facebook-btn:hover {
background-color: #3b5998;
border-color: transparent;
color: #fff;
}
.account-login .login-form .social-login .twitter-btn {
border-color: #55acee;
background-color: transparent;
color: #55acee;
}
.account-login .login-form .social-login .twitter-btn:hover {
background-color: #55acee;
border-color: transparent;
color: #fff;
}
.account-login .login-form .social-login .google-btn {
border-color: #dd4b39;
background-color: transparent;
color: #dd4b39;
}
.account-login .login-form .social-login .google-btn:hover {
background-color: #dd4b39;
border-color: transparent;
color: #fff;
}
.account-login .bottom-content {
margin-top: 25px;
}
.account-login .alt-option {
margin: 30px 0;
text-align: center;
display: inline-block;
position: relative;
width: 100%;
z-index: 1;
}
@media (max-width: 767px) {
.account-login .alt-option {
  margin: 20px 0;
}
}
.account-login .alt-option span {
font-size: 14px;
background: #fff;
color: #888;
padding: 5px 15px;
}
.account-login .alt-option:before {
position: absolute;
left: 0;
top: 50%;
height: 1px;
width: 100%;
background: #e6e6e6;
content: "";
z-index: -1;
}
.account-login .form-group {
margin-bottom: 15px;
}
.account-login .form-group label {
display: block;
margin-bottom: 8px;
width: 100%;
}
.account-login .form-group .form-control {
padding: 0 18px;
-webkit-transition: color 0.25s, background-color 0.25s, border-color 0.25s;
transition: color 0.25s, background-color 0.25s, border-color 0.25s;
border: 1px solid #e0e0e0;
background-color: #fff;
color: #505050;
font-size: 14px;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
height: 46px;
border-radius: 4px !important;
overflow: hidden;
width: 100%;
}
.account-login .form-group .form-control:focus {
border-color: #0167f3;
}
.account-login .lost-pass {
color: #888;
}
.account-login .lost-pass:hover {
color: #0167f3;
}
.account-login .button {
margin-top: 30px;
}
.account-login .button .btn {
width: 100%;
}
.account-login .outer-link {
display: block;
font-size: 14px;
font-weight: 500;
color: #081828;
margin-top: 30px;
text-align: center;
}
.account-login .outer-link a {
color: #0167f3;
}
.account-login .outer-link a:hover {
text-decoration: underline;
}
</style>