<template>
<div class="login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login_form" :label-width="1200" label-position="top">
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="code">
            <Input type="text" v-model="formInline.code" placeholder="code" />
            <span class="yanzhengma_img"><img :src="this.imgCode" @click="getLoginCode()" /></span>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
    export default {
        created () {
         this.getLoginCode();
        },
        data () {
            return {
                imgCode:"",
                imgToken: '',
                formInline: {
                    user: 'admin',
                    password: 'xinchan123',
                    code: '请输入验证码'
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位数', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        //调用登录逻辑
                        
                        const param ={"username":this.formInline.user,"password":this.formInline.password,"code":this.formInline.code,"imgToken":this.imgToken};
                        console.log(param)
                        const {data : res}=await this.axios.post("http://localhost:9090/account/login",param)
                         console.log("登录返回")
                        console.log(res)
                        if(res.httpStatusCode==200){
                            //获取令牌
                            //const tokenPram={"client_id":"3EgGv5kP","client_secret":"123456","grant_type":"client_credentials"}
                            const tokenPram="client_id=XCD1E4LE&client_secret=xinchan123&grant_type=password&username=admin&password=xinchan123"
                            const {data : res}=await this.axios.post("http://localhost:9090/oauth/token"+"?"+tokenPram)
                            console.log("获取到令牌"+res.access_token)
                            //保存令牌
                            window.sessionStorage.setItem("token",res.access_token)
                            //跳转倒首页
                            this.$router.push("/home")
                        }
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
           //调用验证码
            async getLoginCode() {
                 const {data : res}=await this.axios.get("http://localhost:9090/account/getLoginImageCode")
                console.log(res)
                if(res.httpStatusCode==200){
                  this.imgCode="data:image/jpg;base64,"+res.data.img;
                  this.imgToken=res.data.imgToken;
                  
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.login {
    background-image: url(../../assets/images/main.jpg);
    background-repeat: no-repeat;
    
}
Form {
padding-top:600px;
padding-right: 300px;
}
.yanzhengma_img{
    float: left;
}
img {
    width: 80px;
    margin-top:10px;
}
</style>