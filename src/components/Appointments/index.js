// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    selectedDate: '',
    appointmentsList: [],
    isActiveStarred: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({selectedDate: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, selectedDate} = this.state
    const dateObject = new Date(selectedDate)
    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()

    const formattedDate = format(
      new Date(year, day, month),
      'dd MMMM yyyy, EEEE',
    )
    const newAppointment = {
      id: v4(),
      title,
      formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      selectedDate: '',
    }))
  }

  onToggleIsStarred = id =>
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))

  onActivatingStarredBtn = () => {
    this.setState(prevState => ({isActiveStarred: !prevState.isActiveStarred}))
  }

  render() {
    const {title, selectedDate, appointmentsList, isActiveStarred} = this.state
    const starredBtnEffect = isActiveStarred
      ? 'active-starred-btn'
      : 'inactive-starred-btn'
    const filteredList = appointmentsList.filter(
      eachItem => eachItem.isStarred === true,
    )
    const listToDisplay = isActiveStarred ? filteredList : appointmentsList
    return (
      <div className="app-container">
        <div className="content-container">
          <div className="user-input-section">
            <form className="input-form" onSubmit={this.onAddAppointment}>
              <h1 className="main-heading">Add Appointment</h1>
              <div className="input-container">
                <label className="labels" htmlFor="title">
                  TITLE
                </label>
                <input
                  className="inputs"
                  type="text"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="input-container">
                <label className="labels" htmlFor="date">
                  DATE
                </label>
                <input
                  className="inputs"
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={this.onChangeDate}
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <div className="hr-container">
            <hr />
          </div>
          <div className="appointments-section">
            <div className="appointments-heading-container">
              <h1 className="sub-heading">Appointments</h1>
              <button
                onClick={this.onActivatingStarredBtn}
                className={starredBtnEffect}
                type="button"
                data-testid="star"
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {listToDisplay.map(eachItem => (
                <AppointmentItem
                  eachAppointmentDetails={eachItem}
                  key={eachItem.id}
                  onToggleIsStarred={this.onToggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
