<template>
  <div class="loading-screen">
    <div class="loading-container">
      <!-- 로고 -->
      <div class="logo-circle">
        <span class="logo-text">Bo</span>
      </div>

      <!-- 스피너 애니메이션 -->
      <div class="spinner-container">
        <svg class="spinner" viewBox="0 0 50 50">
          <circle
              class="spinner-circle"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="3"
          ></circle>
        </svg>
      </div>

      <!-- 로딩 텍스트 -->
      <p class="loading-text">로딩 중...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
};
</script>

<style scoped>
.loading-screen {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00d4ff 0%, #0066ff 50%, #003d99 100%);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 3vw, 2rem);
}

/* 로고 원 */
.logo-circle {
  width: clamp(60px, 14vw, 100px);
  height: clamp(60px, 14vw, 100px);
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

.logo-text {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #0066ff;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

/* 스피너 */
.spinner-container {
  width: clamp(50px, 12vw, 80px);
  height: clamp(50px, 12vw, 80px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 100%;
  height: 100%;
  animation: rotate 2s linear infinite;
}

.spinner-circle {
  stroke: white;
  stroke-linecap: round;
  stroke-dasharray: 80;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 80;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -80;
  }
}

/* 로딩 텍스트 */
.loading-text {
  font-size: clamp(0.85rem, 1.8vw, 1.2rem);
  color: white;
  font-weight: 600;
  margin: 0;
  letter-spacing: clamp(0.5px, 0.2vw, 1px);
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>