import React, { useEffect, useState } from 'react'

const currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDay()
}

const monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const CalendarForm = ({ handleDateChange = () => {} }) => {
    const [dateForm, setDateForm] = useState({
        year: currentDate.year,
        month: currentDate.month,
        day: currentDate.day
    })

    const availableYears = [...Array(10).keys()].map(id => {
        return <option key={id} value={currentDate.year + id}>{currentDate.year + id}</option>
    })

    const availableMonths = () => {
        const months = []
        for (let i = 0; i < 12; i++) {
            if (dateForm.year === currentDate.year && i < currentDate.month) {
                continue
            }
            months.push(
                <option key={i} value={i}>{monthStrings[i]}</option>
            )
        }
        return months
    }

    const availableDays = () => {
        const days = []
        // Generates number of days within the given month
        const daysInMonth = new Date(dateForm.year, dateForm.month + 1, 0).getDate()
        for (let i = 1; i <= daysInMonth; i++) {
            if (dateForm.year === currentDate.year && dateForm.month === currentDate.month && i < currentDate.day) {
                continue
            }
            days.push(<option key={i} value={i}>{i}</option>)
        }
        return days
    }

    useEffect(() => {
        if (dateForm.year === currentDate.year) {
            setDateForm({
                ...dateForm,
                month: currentDate.month,
                day: currentDate.day
            })
        }
    }, [dateForm.year])

    useEffect(() => {
        handleDateChange(String(dateForm.year) + "-" + String(dateForm.month + 1) + "-" + String(dateForm.day))
    }, [dateForm])

    return (
        <div className="flex justify-between">
            <select value={dateForm.year} onChange={(e) => setDateForm({ ...dateForm, year: parseInt(e.target.value) })}>
                {availableYears}
            </select>
            <select value={dateForm.month} onChange={(e) => setDateForm({ ...dateForm, month: parseInt(e.target.value) })}>
                {availableMonths()}
            </select>
            <select value={dateForm.day} onChange={(e) => setDateForm({ ...dateForm, day: parseInt(e.target.value) })}>
                {availableDays()}
            </select>
        </div>
    )
}

export default CalendarForm
