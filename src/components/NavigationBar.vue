<!-- 네비게이션 바 디자인 -->
<template>
  <nav class="navbar">
    <div class="navbar-content">
      <!-- 로고 -->
      <div class="navbar-logo">
        <router-link to="/" class="logo">Bo:On</router-link>
      </div>

      <!-- 메뉴 영역 -->
      <div class="navbar-menu">
        <router-link to="/search" class="nav-link">보험 검색</router-link>
        <router-link to="/recent" class="nav-link">최근 조회 결과</router-link>
        <router-link to="/favorites" class="nav-link">즐겨찾기</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: clamp(0.08rem, 0.15vw, 0.08rem);
  background: transparent;
  height: clamp(3.125rem, 8vw, 4.375rem);
  z-index: 100;
  width: 100%;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 clamp(0.5rem, 2vw, 2rem);
  gap: clamp(0.5rem, 1vw, 2rem);
  width: 100%;
}

/* 로고 영역 */
.navbar-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: clamp(0.5rem, 1vw, 2rem);
  position: relative;
  z-index: 10;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 800;
  letter-spacing: 0.06rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.logo:hover { opacity: 0.8; }

/* 메뉴 영역 */
.navbar-menu {
  display: flex;
  gap: clamp(10.4rem, 12.4vw, 12.4rem);
  margin-left: clamp(-9rem, 9vw, -7rem);
  flex-grow: 1;
  justify-content: center;
  flex-wrap: wrap;
}

/* 각 메뉴 요소 */
.nav-link {
  color: white;
  text-decoration: none;
  font-size: clamp(0.45rem, 0.93vw, 1rem);
  font-weight: 450;
  padding: clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 1rem);
  border-bottom: 0.125rem solid transparent;
  transition: border-color 0.2s;
  white-space: nowrap;
}

.nav-link:hover { text-shadow: 0.15vw 0.15vw 0.15vw rgba(0, 0, 0, 0.37); }
.nav-link:focus-visible { outline: none; }
</style>