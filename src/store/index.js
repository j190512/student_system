import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//假数据
import Data from '../../mock/data.json'

const state = { //要设置的全局访问的state对象
    data: Data,
};

const getters = {
    getData: (state) => (n) => {
        let temp = state.data.filter(item => item.grade == n)
        return temp
    },
    getMajorTotal: (state) => (subject) => {
        let count = 0
        for (let item of state.data) {
            if (item.major == subject) {
                count++;
            }
        }
        return count
    }
};

const mutations = {
    //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象)
    //这里面的参数除了state之外还传了需要增加的值
    newStudent(state, form) {
        state.data.push(form)
    },
    setStudent(state, obj) {
        // console.log(obj.form+' AAAA '+obj.oldId)
        for (let i in state.data) {
            if (state.data[i].id == obj.oldId) {
                state.data[i] = {
                    ...obj.form
                }
            }
        }
    },
    del(state, param) {
        for (let index in state.data) {
            if (param == state.data[index].id) {
                state.data.splice(index, 1);
                return;
            }
        }
    },
    delBatch(state, param) {
        // 删除多个
        let flag, id, i;
        for (let obj of param) {
            id = obj.id;
            flag = true;
            //找到结果 立马跳出此循环
            for (i = 0; flag; i++) {
                if (id == state.data[i].id) {
                    state.data.splice(i, 1);
                    flag = false;
                }
            }
        }
    }
};

const actions = {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    // this.$store.dispatch('方法名')
    setS(context, obj) {
        context.commit('setStudent', obj)
    },
    newS(context, s) {
        context.commit('newStudent', s)
    },
    del(context, id) {
        context.commit('del', id)
    },
    delBatch(context, ids) {
        context.commit("delBatch", ids)
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;