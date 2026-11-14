<script setup lang="ts">
import { SPONSOR_URL } from '../../sponsor';
</script>

<template>
  <div class="sponsor-card">
    <div class="sponsor-card__text">
      <div class="sponsor-card__title">♥ Sponsor Sycee UI</div>
      <p class="sponsor-card__desc">
        Sycee UI is an MIT-licensed open-source project built and maintained in
        spare time. Sponsorships keep development going — covering new
        components, accessibility audits, and docs hosting.
      </p>
    </div>
    <a
      class="VPButton medium brand sponsor-card__btn"
      :href="SPONSOR_URL"
      target="_blank"
      rel="noopener noreferrer"
    >
      Become a sponsor
    </a>
  </div>
</template>

<style scoped>
.sponsor-card__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 0 20px;
  height: 40px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}
</style>
