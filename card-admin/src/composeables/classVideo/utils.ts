import { Layer } from "."

export type LayerImage = 'image'
export type LayerText = 'text'
export type LayerVideo = 'video'

export const checkLayerType = <T extends LayerImage | LayerText | LayerVideo>(item: Layer, type: T) => {
  if (item.type === type) {
    return true;
  }
}