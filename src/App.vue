<template>
  <div class="app-container">
    <NavigationBar />

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
  setup() {
    const router = useRouter()
    return {
      router,
    }
  },
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  background: var(--boon-gradient);
}

#app {
  background: transparent;
}
</style>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.main-content {
  flex: 1;
  width: 100%;
  min-width: 0;
  overflow-y: auto;
  background: transparent;
}
</style>