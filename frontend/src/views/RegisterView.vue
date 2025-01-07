<template>
  <div class="register">
    <h1>Регистрация</h1>
    <form>
      <input type="text" placeholder="Имя" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Пароль" />
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 10px;
}
</style>
