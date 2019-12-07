(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{178:function(e,t,a){},190:function(e,t,a){"use strict";var i=a(178);a.n(i).a},196:function(e,t,a){"use strict";var i={props:{form:{type:Object,required:!0},visible:{type:Boolean,default:!1},title:{type:String,required:!0}},watch:{visible:function(){this.dialogVisible=this.visible},dialogVisible:function(){this.dialogVisible||(this.clearValidate("form"),this.close())},form:function(){this.id=this.form.id}},data:function(){var e=this;return{formRules:{id:[{required:!0,validator:function(t,a,i){var r=-1;e.form.id&&(r=e.id);var l=!0,n=!1,o=void 0;try{for(var s,c=e.$store.state.data[Symbol.iterator]();!(l=(s=c.next()).done);l=!0){var u=s.value;a.toString()==u.id&&(a.toString()==r&&i(),i(new Error("学号已使用")))}}catch(e){n=!0,o=e}finally{try{l||null==c.return||c.return()}finally{if(n)throw o}}""===a||5!=a.toString().length?i(new Error("请正确输入学号（5位数字）")):i()},trigger:"blur"}],name:[{required:!0,validator:function(e,t,a){""==t?a(new Error("请输入名字")):/^[\u4e00-\u9fa5]{2,7}$/.test(t)?a():a(new Error("请输入中文名字(2-7个汉字)"))},trigger:"blur"}],age:[{required:!0,validator:function(e,t,a){null==t?a(new Error("年龄有误")):a()},trigger:"blur"}]},dialogVisible:!1,id:-1}},methods:{close:function(){this.dialogVisible=!1,this.$emit("close",this.dialogVisible)},onSubmitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;if("编辑"==t.title)t.$store.dispatch("setS",{form:t.form,oldId:t.id});else{if("新增"!=t.title)return!1;t.$store.dispatch("newS",t.form)}t.dialogVisible=!1,t.$message({type:"success",message:"".concat(t.title,"成功!")})}))},clearValidate:function(e){this.$refs[e].clearValidate()}}},r=a(18);function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var s={components:{Dialog:Object(r.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.title,width:"40%",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"60px",rules:e.formRules,"status-icon":""}},[a("el-form-item",{attrs:{label:"学号",prop:"id"}},[a("el-input",{attrs:{clearable:"",placeholder:"5位数字"},model:{value:e.form.id,callback:function(t){e.$set(e.form,"id",e._n(t))},expression:"form.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名",prop:"name"}},[a("el-input",{attrs:{clearable:"",placeholder:"2-7个汉字"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别"}},[a("el-radio-group",{model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}},[a("el-radio",{attrs:{label:"1"}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("女")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"年龄",prop:"age"}},[a("el-input-number",{attrs:{min:1,max:200},model:{value:e.form.age,callback:function(t){e.$set(e.form,"age",t)},expression:"form.age"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"专业"}},[a("el-select",{attrs:{placeholder:"请选择专业"},model:{value:e.form.major,callback:function(t){e.$set(e.form,"major",t)},expression:"form.major"}},[a("el-option",{attrs:{label:"语文",value:"语文"}},[e._v("语文")]),e._v(" "),a("el-option",{attrs:{label:"英语",value:"英语"}},[e._v("英语")]),e._v(" "),a("el-option",{attrs:{label:"数学",value:"数学"}},[e._v("数学")])],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmitForm("form")}}},[e._v("立即"+e._s(e.title))]),e._v(" "),a("el-button",{on:{click:e.close}},[e._v("取消")])],1)],1)],1)}),[],!1,null,null,null).exports},props:{grade:{type:String,required:!0}},mounted:function(){this.getData()},data:function(){return{tableData:[],delBatch:[],delOne:"",selectStu:"",form:{id:"",name:"",sex:"1",age:"",major:"语文",grade:this.grade},show:!1,dialogTitle:"",loading:!1,currentPage:1,pageSize:6}},methods:{getData:function(){this.tableData=this.$store.getters.getData(this.grade),this.loading=!1},inputNumber:function(){this.selectStu=this.selectStu.replace(/[^\d.]/g,"")},closed:function(e){this.show=e,this.form={id:"",name:"",sex:"1",age:"",major:"语文",grade:this.grade},this.getData()},formatSex:function(e,t){return 1==e.sex?"男":"女"},select:function(){var e={},t=[];if(""!=this.selectStu)for(var a in this.loading=!0,this.$store.state.data){if(this.$store.state.data[a].id==this.selectStu)return(e=n({},this.$store.state.data[a])).name+="(".concat(this.$store.state.data[a].grade,"年级)"),t.push(e),this.tableData=t,void(this.loading=!1);if(a==this.$store.state.data.length-1)return this.$message({type:"error",message:"没有找到数据!"}),void this.getData()}else this.$message({type:"error",message:"没有符合数据!"}),this.getData()},tip:function(e){var t=this;""!=e?this.$confirm("此操作将删除此记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.loading=!0,t.del(e),t.$message({type:"success",message:"删除成功!"})})).catch((function(){t.$message({type:"info",message:"已取消删除"})})):this.$message({type:"info",message:"没有数据"})},handleEdit:function(e,t){t?(console.log("编辑"),this.dialogTitle="编辑",this.form=n({},t,{index:e})):this.dialogTitle="新增",this.show=!0},handleDelete:function(e,t){this.delOne=t.id,this.tip(this.delOne)},handleSelectionChange:function(e){this.delBatch=e},handleDelBatch:function(){this.tip(this.delBatch)},del:function(e){e&&(Array.isArray(e)?(this.$store.dispatch("delBatch",e),this.getData(),this.delBatch=[]):(this.$store.dispatch("del",e),this.getData(),this.delOne=""))},handleCurrentChange:function(e){this.currentPage=e}}},c=(a(190),Object(r.a)(s,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrap"},[a("el-col",{staticStyle:{width:"100%"}},[a("div",{staticClass:"grid-content bg-purple"},[a("div",{staticClass:"select-new"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"学号"}},[a("el-input",{attrs:{placeholder:"学号",clearable:""},nativeOn:{keyup:function(t){return e.inputNumber(t)}},model:{value:e.selectStu,callback:function(t){e.selectStu=t},expression:"selectStu"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.select}},[e._v("查询")])],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleEdit}},[e._v("新增")])],1)],1)])]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{type:"index",width:"50",label:"#"}}),e._v(" "),a("el-table-column",{attrs:{prop:"id",label:"学号",width:"150",align:"center",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sex",label:"性别",width:"120",formatter:e.formatSex,align:"center",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"age",label:"年龄",width:"120",align:"center",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"major",label:"专业",width:"180",align:"center",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"330"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-col",{staticStyle:{width:"100%"}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{staticClass:"delBatch",attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelBatch()}}},[e._v("批量删除")]),e._v(" "),a("el-pagination",{staticClass:"pages",attrs:{background:"",layout:"total,prev, pager, next","page-size":e.pageSize,total:e.tableData.length,"current-page":e.currentPage},on:{"current-change":e.handleCurrentChange}})],1)]),e._v(" "),a("Dialog",{attrs:{form:e.form,visible:e.show,title:e.dialogTitle},on:{close:e.closed}})],1)}),[],!1,null,"ef7c9a1c",null));t.a=c.exports},386:function(e,t,a){"use strict";a.r(t);var i={components:{dataShow:a(196).a}},r=a(18),l=Object(r.a)(i,(function(){var e=this.$createElement;return(this._self._c||e)("data-show",{attrs:{grade:"3"}})}),[],!1,null,null,null);t.default=l.exports}}]);