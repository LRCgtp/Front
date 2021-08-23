
<template>
   <div class="layout">
        <Layout class="layout_parent">
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="算法平台" theme="light" width="auto" :open-names="[1]">
                        <Submenu :name="item.title" v-for="item in menuList" :key="item.id">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                <router-link to="/home/views/center">
                                {{item.title}}
                                </router-link>
                            </template>
                            <MenuItem name="sub.name" v-for="sub in item.children" :key="sub.id">{{sub.title}}</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
 export default {
      created () {
          this.getmunuList()
      },
        data() {
           return { menuList: []}
            },
        methods: {
        async getmunuList() {
            const {data : res}= await this.axios.post('http://localhost:9090/center/menu/selectAuthorizeList');
             console.log("返回菜单信息"+res.data)
             if(res.httpStatusCode==200){
              this.menuList=res.data
             }
         }
        }

    }
</script>

<style lang="less" scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
    width: 100%;
}
.layout_parent {
     height: 100%;
    width: 100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
