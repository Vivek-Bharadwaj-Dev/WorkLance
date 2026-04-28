"use client";

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  initialFocus?: boolean;
  mode?: "single" | "multiple" | "range"; // Kept for compatibility but we only implement single for now.
}

export function Calendar({ className, selected, onSelect, disabled, ...props }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date());
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (dayText: number, e: React.MouseEvent) => {
    e.preventDefault();
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayText);
    if (disabled && disabled(newDate)) return;
    if (onSelect) onSelect(newDate);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={`p-4 bg-background border border-border shadow-sm rounded-xl ${className || ""}`}>
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth}
          className="p-1 hover:bg-muted rounded-md transition-colors"
          type="button"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-sm">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button 
          onClick={handleNextMonth}
          className="p-1 hover:bg-muted rounded-md transition-colors"
          type="button"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {dayNames.map(d => (
          <div key={d} className="text-xs font-medium text-muted-foreground w-8">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="w-8 h-8"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const thisDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const isDisabled = disabled ? disabled(thisDate) : false;
          
          let isSelected = false;
          if (selected) {
             isSelected = selected.getDate() === day && 
                          selected.getMonth() === currentMonth.getMonth() && 
                          selected.getFullYear() === currentMonth.getFullYear();
          }

          const isToday = day === new Date().getDate() && 
                          currentMonth.getMonth() === new Date().getMonth() && 
                          currentMonth.getFullYear() === new Date().getFullYear();

          return (
            <button
              key={day}
              type="button"
              disabled={isDisabled}
              onClick={(e) => handleDateClick(day, e)}
              className={`w-8 h-8 flex items-center justify-center text-sm rounded-md transition-colors
                ${isDisabled ? "text-muted-foreground opacity-50 cursor-not-allowed" : "hover:bg-accent"}
                ${isSelected ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : ""}
                ${!isSelected && isToday ? "bg-secondary text-secondary-foreground" : ""}
              `}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"
