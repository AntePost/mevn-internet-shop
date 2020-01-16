<template>
    <div>
        <h2>{{user.firstName}} {{user.lastName}} {{user.email}}</h2>
    </div>
</template>

<script>
export default {
    name: 'PageUserSingle',
    props: ['id'],
    data() {
        return {
            user: {},
        };
    },
    mounted() {
        fetch(`http://localhost:8888/users/${this.id}`)
            .then(response => response.json())
            .then(user => {
                this.user = user;
            });
    },
}
</script>

<style lang="scss" scoped>

</style>