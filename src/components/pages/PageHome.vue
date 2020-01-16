<template>
    <div>
        <ul>
            <li :key="item.id" v-for="item in users">
                <router-link :to="{ name: 'user-single', params: { id: item.id } }">
                    {{item.firstName}} {{item.lastName}} {{item.email}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { request } from 'http';
export default {
    name: 'PageHome',
    data() {
        return {
            users: [],
        };
    },
    mounted() {
        fetch('http://localhost:8888/users')
            .then(request => request.json())
            .then(users => {
                this.users = users;
            });
    },
}
</script>

<style lang="scss" scoped>
    li {
        background-color: red;
    }
</style>