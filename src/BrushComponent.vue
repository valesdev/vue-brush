<template>
  <span
    class="Brush"
    :class="{ 'animated': animated }"
    @click="$emit('click', $event)"
  >

    <svg class="Brush__holder" :width="`${holderWidth}px`" :height="`${holderHeight}px`" :viewBox="`0 0 ${holderWidth} ${holderHeight}`" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect fill="#FFFFFF" fill-opacity="0" x="0" y="0" :width="holderWidth" :height="holderHeight" />
    </svg>

    <span class="Brush__background" />

    <span
      class="Brush__loading"
      :class="{ 'active': (state === 'loading') }"
    />

    <span
      class="Brush__fail"
      :class="{ 'active': (state === 'fail') }"
    />

    <span
      v-if="source"
      class="Brush__image"
      :class="{ 'active': (state === 'success'), 'cropped': cropped }"
      :style="{ 'background-image': `url('${source}')` }"
    />

  </span>
</template>

<script>
export default {
  name: 'Brush',
  emits: ['click'],
  props: {
    source: { type: String, required: false, default: null },
    ratio: { type: Number, required: false, default: 1 },
    cropped: { type: Boolean, required: false, default: false }
  },
  data () {
    return {
      state: 'loading',
      animated: false
    }
  },
  computed: {
    holderWidth () {
      return 1024
    },
    holderHeight () {
      return this.holderWidth / this.ratio
    }
  },
  watch: {
    source () {
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.source) {
        return this.load()
      }
      return this._onFail()
    },

    load () {
      this.animated = false
      if (!this.checkCache()) {
        this.animated = true
        this.state = 'loading'
        const image = new Image()
        image.onload = () => {
          this._onSuccess()
        }
        image.onerror = () => {
          this._onFail()
        }
        image.src = this.source
      } else {
        this._onSuccess()
      }
    },

    checkCache () {
      const image = new Image()
      image.src = this.source
      return image.complete || image.naturalWidth > 0;
    },

    _onSuccess () {
      this.state = 'success'
    },

    _onFail () {
      this.state = 'fail'
    }
  }
}
</script>

<style lang="scss">
.Brush {
  display: block;
  width: 100%;
  overflow: hidden;
  position: relative;

  &__holder {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__background,
  &__loading,
  &__fail,
  &__image {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  }

  &__loading,
  &__fail,
  &__image {
    visibility: hidden;

    &.active {
      visibility: visible;
    }
  }

  &__image {
    background-color: transparent;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 0;
    opacity: 0;

    &.cropped {
      background-size: cover;
    }

    &.active {
      opacity: 1;
    }
  }

  &.animated {
    .Brush__image {
      transition-property: visibility, opacity;
      transition-duration: .25s;
      transition-timing-function: ease-in;
    }
  }

  // theme
  &__background {
    background-color: #fafafa;
  }

  &__loading {
    background: transparent url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBoZWlnaHQ9IjEwMCIgd2lkdGg9IjEwMCI+PGc+PGcgaWQ9ImMiPjxnIGlkPSJiIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgaWQ9ImEiIGQ9Ik01MCAyNVYxMCIvPjx1c2UgdHJhbnNmb3JtPSJyb3RhdGUoLTMwIDUwIDUwKSIgb3BhY2l0eT0iLjgiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgNTAgNTApIiBvcGFjaXR5PSIuNjQiIHhsaW5rOmhyZWY9IiNhIi8+PC9nPjx1c2UgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDUwIDUwKSIgb3BhY2l0eT0iLjUxMiIgeGxpbms6aHJlZj0iI2IiLz48L2c+PHVzZSB0cmFuc2Zvcm09InJvdGF0ZSgtMTgwIDUwIDUwKSIgb3BhY2l0eT0iLjI2MiIgeGxpbms6aHJlZj0iI2MiLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDUwIDUwOyAzMCA1MCA1MDsgNjAgNTAgNTA7IDkwIDUwIDUwOyAxMjAgNTAgNTA7IDE1MCA1MCA1MDsgMTgwIDUwIDUwOyAyMTAgNTAgNTA7IDI0MCA1MCA1MDsgMjcwIDUwIDUwOyAzMDAgNTAgNTA7IDMzMCA1MCA1MDsiIGR1cj0iLjVzIiBjYWxjTW9kZT0iZGlzY3JldGUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9nPjwvc3ZnPg==') no-repeat center center / 16px 16px;
  }

  &__fail {
    background: transparent url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI0RERCIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+PHBhdGggZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNTUgNzVINDVWNjVoMTB6TTU1IDU1SDQ1VjI1aDEweiIvPjwvZz48L3N2Zz4=') no-repeat center center / 24px 24px;
  }
}
</style>
