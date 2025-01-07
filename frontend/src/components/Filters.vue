<template>
  <div class="filters">
    <select>
      <option>Категории услуг</option>
      <option>Услуга 1</option>
      <option>Услуга 2</option>
    </select>
    <input type="number" placeholder="Минимальная цена" />
    <input type="number" placeholder="Максимальная цена" />
    <input type="datetime-local" />
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.filters {
  display: flex;
  gap: 20px;
  margin-right: 20px;
}

select, input {
  padding: 10px;
  border: 1px solid #555;
  border-radius: 5px;
  background-color: #222;
  color: #ffffff;
}
</style>
