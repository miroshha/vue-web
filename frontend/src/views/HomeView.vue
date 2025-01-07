<template>
  <div class="home-view">
    <Header />
    <div class="main-content">
      <Filters />
      <ServiceProviderList :providers="serviceProviders" />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Filters from '../components/Filters.vue';
import ServiceProviderList from '../components/ServiceProviderList.vue';

export default {
  name: 'HomeView',
  components: {
    Header,
    Filters,
    ServiceProviderList
  },
  data() {
    return {
      serviceProviders: [
        { id: 1, name: 'john doe barbershop', rating: 4.5, photo: 'https://play-lh.googleusercontent.com/z-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw=w526-h296-rw' },
        { id: 2, name: 'Провайдер 2', rating: 4.0, photo: 'https://play-lh.googleusercontent.com/z-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw=w526-h296-rw' },
        // Добавьте больше провайдеров по мере необходимости
      ]
    };
  }
};
</script>

<style scoped>
.home-view {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.main-content {
  display: flex;
  padding: 20px;
}
</style>
