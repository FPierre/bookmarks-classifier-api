import tags from '../tags'
import Extractor from './Extractor'

const extractor = new Extractor(tags)

extractor.process()
extractor.writeJSON()
