import { CLASS_OR_ID } from '../../../config/index'

export default function codeFense (h, cursor, block, token, outerClass) {
  const { start, end } = token.range
  const { marker } = token

  const markerContent = this.highlight(h, block, start, start + marker.length, token)
  const content = this.highlight(h, block, start + marker.length, end, token)

  return [
    h(`span.${CLASS_OR_ID['AG_GRAY']}`, markerContent),
    h(`span.${CLASS_OR_ID['AG_LANGUAGE']}`, content)
  ]
}