import Moment from 'moment'

export default {
  dateFormat (time) {
    return time && Moment(time).format('YYYY-MM-DD HH:mm:ss')
  },
  dayFormat (time) {
    return time && Moment(time).format('YYYY-MM-DD')
  }
}

