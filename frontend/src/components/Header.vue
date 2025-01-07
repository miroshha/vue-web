<template>
  <header class="header">
    <div class="logo">Логотип</div>
    <nav class="nav">
      <a href="#">Главная</a>
      <a href="#">Войти</a>
      <a href="#">Регистрация</a>
    </nav>
    <input type="text" placeholder="Поиск услуг..." class="search-input" />
  </header>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav a {
  margin: 0 15px;
  color: #ffffff;
  text-decoration: none;
}

.search-input {
  padding: 10px;
  border: none;
  border-radius: 5px;
}
</style>
