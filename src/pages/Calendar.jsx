import { useState, useEffect } from 'react';

function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState({});
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', time: '', description: '' });

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const isSelected = (day) => {
        return day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear();
    };

    const handleAddEvent = () => {
        const dateKey = selectedDate.toISOString().split('T')[0];
        const updatedEvents = {
            ...events,
            [dateKey]: [...(events[dateKey] || []), newEvent]
        };
        setEvents(updatedEvents);
        setNewEvent({ title: '', time: '', description: '' });
        setShowAddEvent(false);
    };

    const getEventsForDate = (date) => {
        const dateKey = date.toISOString().split('T')[0];
        return events[dateKey] || [];
    };

    return (
        <div className="h-full flex flex-col text-white p-4">
             <button 
                        onClick={() => setShowAddEvent(true)}
                        className="material-icons text-white/80 hover:text-white/50 absolute right-0 mr-7 mt-5"
                    >
                        add_circle
                    </button>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button 
                    onClick={handlePrevMonth}
                    className="material-icons text-white/80 hover:text-white"
                >
                    chevron_left
                </button>
                <h2 className="text-xl font-semibold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button 
                    onClick={handleNextMonth}
                    className="material-icons text-white/80 hover:text-white"
                >
                    chevron_right
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1">
                {/* Day Names */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => (
                        <div key={day} className="text-center text-sm text-white/70">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                        const dayEvents = getEventsForDate(date);
                        return (
                            <button
                                key={day}
                                onClick={() => setSelectedDate(date)}
                                className={`aspect-square rounded-full flex items-center justify-center text-sm transition-colors relative
                                    ${isToday(day) ? 'bg-white/20' : ''}
                                    ${isSelected(day) ? 'bg-white text-black' : 'hover:bg-white/10'}
                                `}
                            >
                                {day}
                                {dayEvents.length > 0 && (
                                    <div className="absolute bottom-1 w-1 h-1 bg-white rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Date Info */}
            <div className="mt-4 p-3 bg-white/10 rounded-xl overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">
                        {selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </h3>
                   
                </div>
                <div className="space-y-2">
                    {getEventsForDate(selectedDate).length === 0 ? (
                        <p className="text-white/70">No events scheduled</p>
                    ) : (
                        getEventsForDate(selectedDate).map((event, index) => (
                            <div key={index} className="bg-white/5 p-2 rounded-lg">
                                <div className="font-medium">{event.title}</div>
                                {event.time && <div className="text-sm text-white/70">{event.time}</div>}
                                {event.description && <div className="text-sm text-white/70">{event.description}</div>}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Event Modal */}
            {showAddEvent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-gray-800 rounded-xl p-4 w-full max-w-sm">
                        <h3 className="text-xl font-semibold mb-4">Add Event</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Event Title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                className="w-full bg-white/10 rounded-lg p-2 text-white placeholder-white/50"
                            />
                            <input
                                type="time"
                                value={newEvent.time}
                                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                                className="w-full bg-white/10 rounded-lg p-2 text-white"
                            />
                            <textarea
                                placeholder="Description (optional)"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                className="w-full bg-white/10 rounded-lg p-2 text-white placeholder-white/50 h-24"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowAddEvent(false)}
                                    className="px-4 py-2 text-white/70 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddEvent}
                                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90"
                                >
                                    Add Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarPage; 