<template>
	<div id="app">
		<transition-group name="fade-in-out" tag="div" id="loadings">
      <div v-for="loading in loadings" :key="loading.id">
        <div class="bar" :class="[loading.state, !loading.state.startsWith('loading') && 'done']"></div>
      </div>
    </transition-group>
    <transition name="zoom-in-fade-out">
      <router-view></router-view>
    </transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import types from '@store/types'
export default {
  name: 'app',
  computed: {
    ...mapGetters({
      'loadings': types.loading.getter.list
    })
  },
  watch: {},
  methods: {},
  async created () {
  }
}

</script>

<style lang="scss">
@import "./assets/scss/style.scss";
@import "./assets/scss/common.scss";
@import "./assets/css/font-awesome.min.css";
#loadings {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
  opacity: .8;

  .container {
    width: 100%;
    transition: all .3s;
  }
  .bar {
    height: 3px;
    background: $primary-second;
    transition: all 8s cubic-bezier(0, 0.87, 0.2, 1);
    transform-origin: left 50%;
    box-shadow: $border-black;
  }
  .bar.loading-begin {
    transform: scaleX(0);
  }
  .bar.loading {
    transform: scaleX(.75);
  }
  .bar.done {
    transition: all .2s cubic-bezier(0.55, 0.09, 0.68, 0.53);
    transform: scaleX(1);
  }
  .bar.error {
    background: $danger;
  }
}
/* transition fade-in-out */
.fade-in-out-enter {
  opacity: 0;
}
.fade-in-out-leave-active {
  opacity: 0;
  position: absolute;
}
/* transition fade-in-out */

/* transition zoom-in-fade-out */
.zoom-in-fade-out-enter {
  transform: scale(0.9);
  opacity: 0.8;
}

.zoom-in-fade-out-enter-active,
.zoom-in-fade-out-leave-active {
  transition: all .8s cubic-bezier(0.23, 1, 0.32, 1);
}

.zoom-in-fade-out-leave-active {
  opacity: 0;
  transform: scale(1.1);
  position: absolute;
  width: 100%;
}
</style>
