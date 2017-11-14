import moment from 'moment'

export default (lastModified) => {
  if (moment(lastModified).isSame(moment(), 'day')) {
    return moment(lastModified).format("h:mm a")
  } else {
    return moment(lastModified).format('MM/DD/YY')
  }
}