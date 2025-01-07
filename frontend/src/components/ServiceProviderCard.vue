<template>
  <div class="provider-card">
    <img :src="provider.photo" alt="Provider Photo" class="provider-photo" />
    <h3>{{ provider.name }}</h3>
    <p>Рейтинг: {{ provider.rating }}</p>
    <button class="profile-button">Посмотреть профиль</button>
  </div>
</template>

<script>
export default {
  props: {
    provider: Object
  }
};
</script>

<style lang="scss">
.provider-card {
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 15px;
  width: 200px;
  text-align: center;
  transition: transform 0.2s;
}

.provider-card:hover {
  transform: scale(1.05);
}

.provider-photo {
  width: 100%;
  border-radius: 10px;
}

.profile-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.profile-button:hover {
  background-color: #45a049;
}
</style>
