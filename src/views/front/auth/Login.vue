<template>
    <div class="account-login">
        <form method="POST" action="" class="card login-form">
            <div class="title">
                <h3>ĐĂNG NHẬP</h3>
                <p>
                    Bạn có thể đăng nhập bằng tài khoản mạng xã hội hoặc địa chỉ email của mình.
                </p>
            </div>

            <div class="social-login">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-12">
                        <a class="btn facebook-btn" href="javascript:void(0)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg>
                            Facebook
                        </a>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                        <a class="btn google-btn" href="javascript:void(0)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                            </svg>
                            Google 
                        </a>
                    </div>
                </div>
            </div>
            <div class="alt-option">
                <span>Or</span>
            </div>
            <p class="text-danger" v-if="error" > {{  error }}</p>
            <LoginForm
                @submit:login="createLogin"
            />

        </form>
    </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';
import AuthService from "@/services/front/auth.service";

export default {
  components: { 
    LoginForm 
  },
  data() {
    return {
        error: '',
    }
  },
  
  methods: {
    async createLogin(form) {
        try {
            await AuthService.login(form).then((response) => {
                console.log(response);
                localStorage.setItem('token', response.token);
                this.$store.dispatch('user', response.user);
                this.$store.dispatch('userId', response.user.id);
                
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
                    title: 'Đăng nhập thành công.'
                })

                this.$router.push({ name: "home" });
            });
            
        } catch (error) {            
            this.error = "Email hoặc mật khẩu không đúng.";
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