<template>
<div>
    <Table stripe :columns="columnsList" :data="clientDataList"></Table>
    <p class="page_class">
     <Page 
     :total=this.total 
     :page-size=this.pageSize 
     show-total 
     @on-change="changePage"
     />
    </p>
    
</div>
</template>
<script>
    export default {
        mounted() {
        this.clientList()
        },
        data () {
            return {
                total: 1,
                pageNum: 1,
                pageSize: 2,
                columnsList: [
                    {
                        title: '客户端id',
                        key: 'clientId'
                    },
                    {
                        title: '客户端密钥',
                        key: 'clientSecret'
                    },
                    {
                        title: '客户端标识',
                        key: 'mark'
                    },
                    {
                        title: '启用|停用',
                        key: 'archived'
                    },
                    {
                        title: '客户端范围',
                        key: 'scope'
                    },
                    {
                        title: '客户端模式',
                        key: 'authorizedGrantTypes'
                    },
                     {
                        title: 'token有效期',
                        key: 'accessTokenValidity'
                    },
                    {
                        title: '刷新token有效期',
                        key: 'refreshTokenValidity'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '编辑')
                            ]);
                        }
                         
                    }

                ],
                clientDataList: []
            }
        },
        methods: {
            //分页查询客户端信息
           async clientList(){
               const param={"status":"","startTime":"","endTime":"","pageNum":this.pageNum,"pageSize":this.pageSize,"sortField":"","sortOrder":"","keyWord":""}
                const {data : res}=await this.axios.post("http://localhost:9090/center/client/listPage",param)
                console.log("返回的客户端信息"+res.data.list)
                this.clientDataList=res.data.list
                
                console.log(res.data.pageSize)
                this.total=res.data.total
               // this.pageSize=res.data.pageSize
            },

            //点击页码回调
            changePage(index) {
            this.pageNum=index    
            this.clientList()
            },
        }
    }
</script>

<style lang="less" scoped>
.page_class {
    width: 100%;
   margin-left: 30%;
}
</style>