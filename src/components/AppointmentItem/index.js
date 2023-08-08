// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {eachAppointmentDetails, onToggleIsStarred} = props
  const {id, title, selectedDate, isStarred} = eachAppointmentDetails

  const onClickStar = () => {
    onToggleIsStarred(id)
  }

  const dateObject = new Date(selectedDate)
  const day = dateObject.getDate()
  const month = dateObject.getMonth() + 1
  const year = dateObject.getFullYear()

  const formattedDate = format(new Date(year, day, month), 'dd MMMM yyyy, EEEE')

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="each-appointment">
      <div className="appointment-title-date-container">
        <p className="item-title">{title}</p>
        <p className="date-text">{formattedDate}</p>
      </div>
      <button
        type="button"
        data-testId="star"
        className="star-btn"
        onClick={onClickStar}
      >
        <img src={imgUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
