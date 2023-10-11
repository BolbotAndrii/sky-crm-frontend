import { Calendar } from 'antd'
import type { Moment } from 'moment'
import momentGenerateConfig from 'rc-picker/es/generate/moment'

const RangePicker = Calendar.generateCalendar<Moment>(momentGenerateConfig)

export default RangePicker
