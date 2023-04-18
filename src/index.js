import BrushComponent from './BrushComponent.vue'

const vueBrush = {
  install (app) {
    app.component(BrushComponent.name, BrushComponent)
  }
}

export default vueBrush
