import BrushComponent from './BrushComponent.vue'

const vueBrush = {
  install (Vue, options = {}) {
    Vue.component(BrushComponent.name, BrushComponent)
  }
}

export default vueBrush
