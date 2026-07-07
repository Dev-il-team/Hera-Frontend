<template>
  <main class="subscription-view" aria-labelledby="subscription-title">
    <section class="subscription-hero">
      <div>
        <span class="section-eyebrow">{{ $t('subscription.eyebrow') }}</span>

        <h1 id="subscription-title">{{ $t('subscription.title') }}</h1>

        <p>{{ $t('subscription.description') }}</p>
      </div>

      <pv-tag
          :value="$t('subscription.currentPlanTag', { plan: $t(`subscription.plans.${currentPlanKey}`) })"
          icon="pi pi-check-circle"
          class="current-plan-tag"
          :aria-label="$t('subscription.currentPlanAria')"
      />
    </section>

    <section class="grid subscription-plans" :aria-label="$t('subscription.availablePlansAria')">
      <article class="col-12 lg:col-5">
        <pv-card class="plan-card basic-card">
          <template #content>
            <div class="plan-card-content">
              <div class="plan-icon basic-icon" aria-hidden="true">
                <i class="pi pi-home"></i>
              </div>

              <span class="plan-label">{{ $t('subscription.currentPlanLabel') }}</span>

              <h2>{{ $t(`subscription.plans.${currentPlanKey}`) }}</h2>

              <p class="plan-description">{{ $t('subscription.basicDescription') }}</p>

              <div class="plan-price" :aria-label="$t('subscription.basicPriceAria')">
                <span>€0</span>
                <small>{{ $t('subscription.perMonth') }}</small>
              </div>

              <pv-button
                  :label="$t('subscription.activePlan')"
                  icon="pi pi-check"
                  class="active-button"
                  disabled
                  :aria-label="$t('subscription.activePlanAria')"
              />
            </div>
          </template>
        </pv-card>
      </article>

      <article class="col-12 lg:col-7">
        <pv-card class="plan-card premium-card">
          <template #content>
            <div class="premium-content">
              <div class="premium-main">
                <div class="plan-icon premium-icon">
                  <img
                      :src="logo"
                      :alt="$t('subscription.premiumLogoAlt')"
                      class="premium-logo"
                  />
                </div>

                <span class="plan-label premium-label">{{ $t('subscription.recommended') }}</span>

                <h2>{{ $t('subscription.plans.premium') }}</h2>

                <p class="plan-description">{{ $t('subscription.premiumDescription') }}</p>

                <div class="plan-price premium-price" :aria-label="$t('subscription.premiumPriceAria')">
                  <span>€9.99</span>
                  <small>{{ $t('subscription.perMonth') }}</small>
                </div>
              </div>

              <div class="premium-actions">
                <pv-button
                    :label="currentPlan === 'Premium'
                      ? $t('subscription.activePlan')
                      : $t('subscription.upgradeToPremium')"
                    :icon="currentPlan === 'Premium'
                      ? 'pi pi-check'
                      : 'pi pi-arrow-right'"
                    icon-pos="right"
                    class="upgrade-button"
                    :disabled="currentPlan === 'Premium'"
                    :aria-label="$t('subscription.upgradeToPremiumAria')"
                    @click="upgradePlan"
                />
              </div>
            </div>
          </template>
        </pv-card>
      </article>
    </section>

    <section class="comparison-card" aria-labelledby="comparison-title">
      <div class="comparison-header">
        <div>
          <span class="section-eyebrow">{{ $t('subscription.comparisonEyebrow') }}</span>

          <h2 id="comparison-title">{{ $t('subscription.comparisonTitle') }}</h2>
        </div>

        <p>{{ $t('subscription.scenario') }}</p>
      </div>

      <div
          class="features-comparison"
          role="table"
          :aria-label="$t('subscription.comparisonAria')"
      >
        <div class="comparison-row comparison-head" role="row">
          <div role="columnheader">{{ $t('subscription.benefit') }}</div>

          <div role="columnheader">{{ $t('subscription.plans.basic') }}</div>

          <div role="columnheader" class="premium-column">
            {{ $t('subscription.plans.premium') }}
          </div>
        </div>

        <div
            v-for="feature in planFeatures"
            :key="feature.name"
            class="comparison-row"
            role="row"
        >
          <div class="feature-name" role="cell">
            <i :class="feature.icon" aria-hidden="true"></i>

            <span>{{ $t(feature.name) }}</span>
          </div>

          <div role="cell">
            <i
                v-if="feature.basic"
                class="pi pi-check check-icon"
                :aria-label="$t('subscription.includedBasicAria')"
            ></i>

            <i
                v-else
                class="pi pi-minus minus-icon"
                :aria-label="$t('subscription.notIncludedBasicAria')"
            ></i>
          </div>

          <div role="cell" class="premium-column">
            <i
                class="pi pi-check premium-check-icon"
                :aria-label="$t('subscription.includedPremiumAria')"
            ></i>
          </div>
        </div>
      </div>
    </section>

    <section
        v-if="currentPlan !== 'Premium'"
        class="upgrade-banner"
        :aria-label="$t('subscription.upgradeBannerAria')"
    >
      <div class="upgrade-message">
        <i class="pi pi-shield" aria-hidden="true"></i>

        <div>
          <h2>{{ $t('subscription.basicBannerTitle') }}</h2>

          <p>{{ $t('subscription.basicBannerDescription') }}</p>
        </div>
      </div>

      <pv-button
          :label="$t('subscription.upgradeNow')"
          icon="pi pi-arrow-right"
          icon-pos="right"
          class="banner-button"
          :aria-label="$t('subscription.upgradeNowAria')"
          @click="upgradePlan"
      />
    </section>
  </main>
</template>

<script>

import heraLogo from '@/assets/images/hera-logo.png';
import useSubscriptionManagementStore
  from '../../application/subscription-management.store.js';

export default {
  name: 'SubscriptionView',

  data() {
    return {
      logo: heraLogo,

      store: useSubscriptionManagementStore(),
      upgrading: false,

      currentPlan: 'Basic',

      planFeatures: [
        {
          name: 'subscription.features.consumptionSummary',
          icon: 'pi pi-chart-bar',
          basic: true,
        },
        {
          name: 'subscription.features.smartNotifications',
          icon: 'pi pi-bell',
          basic: true,
        },
        {
          name: 'subscription.features.deviceControl',
          icon: 'pi pi-mobile',
          basic: true,
        },
        {
          name: 'subscription.features.automatedRoutines',
          icon: 'pi pi-calendar',
          basic: false,
        },
        {
          name: 'subscription.features.advancedAnalytics',
          icon: 'pi pi-bolt',
          basic: false,
        },
        {
          name: 'subscription.features.prioritySupport',
          icon: 'pi pi-shield',
          basic: false,
        },
      ],
    };
  },

  computed: {
    currentPlanKey() {
      return this.currentPlan.toLowerCase();
    },
  },

  async mounted() {
    // Load the active subscription from GET /subscriptions.
    try {
      await this.store.fetchSubscriptions();
      const active = this.store.activeSubscription;
      const plan = active?.plan ?? active?.planName ?? active?.name;
      if (typeof plan === 'string' && plan.toLowerCase().includes('premium'))
        this.currentPlan = 'Premium';
    } catch {
      /* keep default Basic plan if the API is unavailable */
    }
  },

  methods: {
    // POST /subscriptions — Subscribe to the Premium plan.
    async upgradePlan() {
      if (this.currentPlan === 'Premium' || this.upgrading) return;
      this.upgrading = true;
      try {
        await this.store.subscribe({ plan: 'Premium' });
        this.currentPlan = 'Premium';
        this.$toast.add({
          severity: 'success',
          summary: this.$t('subscription.upgradeSuccess'),
          life: 4000,
        });
      } catch (e) {
        this.$toast.add({
          severity: 'error',
          summary: this.$t('errors.occurred'),
          detail: e?.response?.data?.message ?? e?.message,
          life: 5000,
        });
      } finally {
        this.upgrading = false;
      }
    },
  },
};
</script>

<style scoped>
.subscription-view {
  min-height: 100vh;
  background: #f7f6f2;
  color: #0d1b2a;
  padding: 3rem 4rem;
}

.subscription-hero {
  background: linear-gradient(135deg, #0d1b2a 0%, #17324d 100%);
  color: #ffffff;
  border-radius: 1.5rem;
  padding: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  box-shadow: 0 18px 45px rgba(13, 27, 42, 0.18);
}

.section-eyebrow {
  display: inline-block;
  margin-bottom: 0.65rem;
  color: #d4af37;
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.subscription-hero h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: 800;
}

.subscription-hero p {
  max-width: 720px;
  margin: 0.75rem 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.08rem;
  line-height: 1.7;
}

.current-plan-tag {
  background: rgba(212, 175, 55, 0.14);
  color: #ffffff;
  border: 1px solid rgba(212, 175, 55, 0.45);
  border-radius: 999px;
  font-weight: 800;
  white-space: nowrap;
}

.subscription-plans {
  margin-top: 2rem;
}

.plan-card,
.comparison-card {
  height: 100%;
  border: 1px solid rgba(13, 27, 42, 0.1);
  border-radius: 1.35rem;
  box-shadow: 0 14px 36px rgba(13, 27, 42, 0.08);
  background: #ffffff;
}

.plan-card {
  transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 45px rgba(13, 27, 42, 0.12);
}

.plan-card-content {
  text-align: center;
  padding: 1.2rem;
}

.plan-icon {
  width: 7rem;
  height: 7rem;
  margin: 0 auto 1.25rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.plan-icon i {
  font-size: 2.8rem;
}

.premium-logo {
  width: 8rem;
  height: 8rem;
  object-fit: contain;
  transform: scale(2.2);
}

.basic-icon {
  color: #0d1b2a;
  background: rgba(13, 27, 42, 0.07);
  border: 2px solid rgba(13, 27, 42, 0.12);
}

.premium-icon {
  color: #d4af37;
  background: rgba(212, 175, 55, 0.1);
  border: 2px solid rgba(212, 175, 55, 0.45);
}

.plan-label {
  color: #65717c;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
}

.premium-label {
  color: #d4af37;
}

.plan-card h2 {
  margin: 0.45rem 0;
  font-size: 2.2rem;
  color: #0d1b2a;
}

.plan-description {
  margin: 0 auto;
  max-width: 520px;
  color: #4f5b67;
  line-height: 1.6;
}

.plan-price {
  margin: 1.6rem 0;
}

.plan-price span {
  font-size: 2.4rem;
  font-weight: 900;
  color: #0d1b2a;
}

.plan-price small {
  margin-left: 0.2rem;
  color: #65717c;
  font-weight: 700;
}

.premium-content {
  min-height: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
}

.premium-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.premium-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 15rem;
}

.premium-card .p-card-body,
.premium-card .p-card-content {
  height: 100%;
}

.upgrade-button {
  min-width: 14rem;
}

.premium-price span {
  color: #d4af37;
}

.active-button {
  width: 100%;
  background: rgba(212, 175, 55, 0.14);
  border: 1px solid rgba(212, 175, 55, 0.35);
  color: #8c6a00;
  font-weight: 800;
  border-radius: 0.75rem;
}

.upgrade-button,
.banner-button {
  width: 100%;
  background: #0d1b2a;
  border-color: #0d1b2a;
  color: #ffffff;
  font-weight: 800;
  border-radius: 0.75rem;
}

.comparison-card {
  margin-top: 2rem;
  padding: 2rem;
}

.comparison-header {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.comparison-header h2 {
  margin: 0;
  color: #0d1b2a;
  font-size: 1.9rem;
}

.comparison-header p {
  max-width: 420px;
  margin: 0;
  color: #65717c;
  line-height: 1.6;
}

.features-comparison {
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(13, 27, 42, 0.08);
  border-radius: 1rem;
}

.comparison-row {
  display: grid;
  grid-template-columns: 1.7fr 0.65fr 0.65fr;
  align-items: center;
  min-height: 4.2rem;
  border-bottom: 1px solid rgba(13, 27, 42, 0.08);
}

.comparison-row:last-child {
  border-bottom: none;
}

.comparison-head {
  min-height: 3.2rem;
  background: #f7f6f2;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
}

.comparison-head div:first-child {
  text-align: left;
}

.comparison-row > div {
  padding: 0 1rem;
}

.feature-name {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-weight: 700;
}

.feature-name i {
  width: 2.35rem;
  height: 2.35rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #0d1b2a;
  background: rgba(13, 27, 42, 0.06);
}

.comparison-row > div:not(.feature-name) {
  text-align: center;
  font-weight: 900;
}

.premium-column {
  height: 100%;
  display: grid;
  place-items: center;
  color: #d4af37;
  background: rgba(212, 175, 55, 0.08);
}

.check-icon {
  color: #0d1b2a;
}

.minus-icon {
  color: #8b95a1;
}

.premium-check-icon {
  color: #d4af37;
}

.upgrade-banner {
  margin-top: 2rem;
  margin-bottom: 3rem;
  padding: 1.8rem 2.2rem;
  background: #0d1b2a;
  color: #ffffff;
  border-radius: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 16px 40px rgba(13, 27, 42, 0.18);
}

.upgrade-message {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.upgrade-message > i {
  font-size: 3rem;
  color: #d4af37;
}

.upgrade-banner h2,
.upgrade-banner p {
  margin: 0;
}

.upgrade-banner p {
  margin-top: 0.4rem;
  color: rgba(255, 255, 255, 0.78);
}

.banner-button {
  max-width: 13rem;
  background: #ffffff;
  border-color: #ffffff;
  color: #0d1b2a;
}

@media (max-width: 960px) {
  .subscription-view {
    padding: 2rem 1.2rem;
  }

  .subscription-hero,
  .premium-content,
  .comparison-header,
  .upgrade-banner {
    flex-direction: column;
    align-items: stretch;
  }

  .premium-actions,
  .banner-button {
    max-width: none;
    width: 100%;
  }
}

@media (max-width: 640px) {
  .subscription-hero {
    padding: 1.7rem;
  }

  .subscription-hero h1 {
    font-size: 2.25rem;
  }

  .comparison-card {
    padding: 1rem;
  }

  .comparison-row {
    grid-template-columns: 1.25fr 0.55fr 0.55fr;
    font-size: 0.86rem;
  }

  .comparison-row > div {
    padding: 0 0.55rem;
  }

  .feature-name {
    gap: 0.35rem;
  }

  .feature-name i {
    display: none;
  }

  .plan-price span {
    font-size: 2rem;
  }
}
</style>