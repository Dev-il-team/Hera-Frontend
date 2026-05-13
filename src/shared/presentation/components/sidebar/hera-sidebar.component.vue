<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'pi pi-chart-line',
    route: '/dashboard'
  },
  {
    label: 'Resumen de consumo',
    icon: 'pi pi-bolt',
    route: '/consumption-summary'
  },
  {
    label: 'Dispositivos',
    icon: 'pi pi-microchip',
    route: '/devices'
  },
  {
    label: 'Rutinas',
    icon: 'pi pi-sync',
    route: '/routines'
  },
  {
    label: 'Notificaciones',
    icon: 'pi pi-bell',
    route: '/notifications'
  },
  {
    label: 'Mi perfil',
    icon: 'pi pi-user',
    route: '/profile'
  },
  {
    label: 'Devices',
    icon: 'pi pi-desktop',
    to: '/devices'
  }
]


const navigateTo = (route) => {
  router.push(route)
}
</script>

<template>
  <aside class="hera-sidebar" aria-label="Menú principal">
    <nav class="sidebar-nav" aria-label="Navegación principal">
      <button
          v-for="item in menuItems"
          :key="item.route"
          :class="[
            'sidebar-item',
            { active: route.path === item.route }
          ]"
          type="button"
          :aria-label="`Ir a ${item.label}`"
          @click="navigateTo(item.route)"
      >
        <i :class="item.icon" aria-hidden="true"></i>
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.hera-sidebar {
  width: 260px;
  min-height: 100vh;
  background: #0D1B2A;
  padding: 1.5rem 1rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-item {
  border: none;
  border-radius: 16px;
  background: transparent;
  color: #F7F6F2;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.25s ease;
}

.sidebar-item i {
  color: #D4AF37;
}

.sidebar-item:hover {
  background: rgba(212, 175, 55, 0.14);
  transform: translateX(4px);
}

.sidebar-item.active {
  background: rgba(212, 175, 55, 0.18);
  border: 1px solid rgba(212, 175, 55, 0.35);
}
</style>