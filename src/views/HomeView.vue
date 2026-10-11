<!-- 홈화면 -->
<template>
  <div class="home-view">
    <div class="content-background"></div>
    <div class="content-overlay">
      <div class="main-message">
        <h1 class="main-title">Bo:On</h1>
        <div class="subtitle-group">
          <p class="main-subtitle">보험을 쉽고 똑똑하게.</p>
          <p class="main-subtitle">온 가족에게 맞는 선택을.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home-view {
  width: 100%;
  min-width: 0;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.content-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

.content-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: clamp(1rem, 3vw, 3rem) clamp(3rem, 6vw, 8rem);
}

.main-message {
  text-align: right;
  color: white;
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1.5vw, 1rem);
  max-width: clamp(12.5rem, 80vw, 43.75rem);
  margin-right: clamp(4rem, 23vw, 15.6rem);
  margin-top: clamp(0.5rem, 12vw, 8.1rem);
}

.main-title {
  font-size: clamp(2.8rem, 12vw, 6rem);
  font-weight: 700;
  font-family: Inter Bold, sans-serif;
  margin: 0;
  letter-spacing: clamp(0.06rem, 0.3vw, 0.18rem);
  text-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
}

.subtitle-group {
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 0.5vw, 0.5rem);
}

.main-subtitle {
  font-size: clamp(0.45rem, 2.15vw, 1.3rem);
  font-weight: 500;
  line-height: 1.6;
  text-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.2);
  text-align: left;
  margin-left: clamp(0.22rem, 0.45vw, 0.4rem);
}
</style>