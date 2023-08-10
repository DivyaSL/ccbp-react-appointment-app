// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointmentDetails, onToggleIsStarred} = props
  const {id, title, formattedDate, isStarred} = eachAppointmentDetails

  const onClickStar = () => {
    onToggleIsStarred(id)
  }

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="each-appointment">
      <div className="appointment-title-date-container">
        <p className="item-title">{title}</p>
        <p className="date-text">{formattedDate}</p>
      </div>
      <button type="button" className="star-btn" onClick={onClickStar}>
        <img src={imgUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
