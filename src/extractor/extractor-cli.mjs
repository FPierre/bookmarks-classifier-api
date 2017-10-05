import tags from '../tags'
import Extractor from './extractor'

const extractor = new Extractor(tags)

extractor.process()
extractor.writeJSON()
