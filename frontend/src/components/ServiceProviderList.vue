<template>
  <div class="provider-list">
    <ServiceProviderCard
      v-for="provider in providers"
      :key="provider.id"
      :provider="provider"
    />
  </div>
</template>

<script>
import ServiceProviderCard from './ServiceProviderCard.vue';

export default {
  components: {
    ServiceProviderCard
  },
  props: {
    providers: Array
  }
};
</script>

<style lang="scss">
.provider-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
