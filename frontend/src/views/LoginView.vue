<template>
  <div class="login">
    <h1>Вход</h1>
    <form>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Пароль" />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 10px;
}
</style>
