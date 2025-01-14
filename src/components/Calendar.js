import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Grid,
  IconButton,
  useTheme,
  Container,
  Tooltip,
  Popover
} from '@mui/material';
import TaskService from '../services/TaskService';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  parseISO,
  startOfWeek,
  endOfWeek,
  addDays
} from 'date-fns';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const getCalendarDays = () => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    const days = eachDayOfInterval({ start, end });
    
    const weeks = [];
    let week = [];
    
    days.forEach(day => {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    });

    return weeks;
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      const taskDate = parseISO(task.due_date);
      return format(taskDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  const handleDateClick = (event, date) => {
    const dayTasks = getTasksForDate(date);
    setSelectedDayTasks(dayTasks);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isSelected = (date) => {
    return format(currentDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const weeks = getCalendarDays();
  const open = Boolean(anchorEl);

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          borderRadius: '16px',
          background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.8), rgba(19, 47, 76, 0.6))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        {/* Header with current date */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(124, 77, 255, 0.1)',
        }}>
          <Typography sx={{ 
            color: theme.palette.primary.light, 
            fontSize: '1.5rem',
            fontWeight: 600 
          }}>
            {format(currentDate, 'EEEE, d MMMM')}
          </Typography>
        </Box>

        {/* Month selector */}
        <Box sx={{ 
          p: 3,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 600,
            color: theme.palette.secondary.light
          }}>
            {format(currentDate, 'MMMM yyyy')}
          </Typography>
          <Box>
            <IconButton 
              onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
              sx={{ color: theme.palette.primary.light }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton 
              onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
              sx={{ color: theme.palette.primary.light }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Calendar grid */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {/* Weekday headers */}
            {weekDays.map((day) => (
              <Grid item key={day} xs={12/7}>
                <Typography
                  align="center"
                  sx={{
                    fontSize: '1rem',
                    color: theme.palette.primary.light,
                    fontWeight: 500,
                    mb: 2
                  }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}

            {/* Calendar days */}
            {weeks.map((week, weekIndex) => (
              week.map((day, dayIndex) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                const dayTasks = getTasksForDate(day);
                const hasTask = dayTasks.length > 0;
                
                return (
                  <Grid item xs={12/7} key={day.toString()}>
                    <Tooltip 
                      title={hasTask ? `${dayTasks.length} tasks` : 'No tasks'}
                      placement="top"
                    >
                      <Box
                        onClick={(e) => handleDateClick(e, day)}
                        sx={{
                          aspectRatio: '1/1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          cursor: 'pointer',
                          borderRadius: '50%',
                          backgroundColor: isSelected(day) 
                            ? theme.palette.primary.main 
                            : hasTask 
                              ? 'rgba(124, 77, 255, 0.1)'
                              : 'transparent',
                          color: isSelected(day) 
                            ? theme.palette.primary.contrastText
                            : isCurrentMonth 
                              ? theme.palette.text.primary 
                              : theme.palette.text.disabled,
                          '&:hover': {
                            backgroundColor: isSelected(day) 
                              ? theme.palette.primary.dark
                              : 'rgba(124, 77, 255, 0.2)'
                          },
                          ...(isToday(day) && !isSelected(day) && {
                            border: `2px solid ${theme.palette.primary.main}`
                          })
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: isToday(day) ? 600 : 400,
                            fontSize: '1.1rem'
                          }}
                        >
                          {format(day, 'd')}
                        </Typography>
                        {hasTask && (
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: '4px',
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              backgroundColor: theme.palette.secondary.main
                            }}
                          />
                        )}
                      </Box>
                    </Tooltip>
                  </Grid>
                );
              })
            ))}
          </Grid>
        </Box>
      </Paper>

      {/* Tasks Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            p: 2,
            background: theme.palette.background.paper,
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: '250px'
          }
        }}
      >
        {selectedDayTasks.length > 0 ? (
          selectedDayTasks.map((task) => (
            <Box 
              key={task.id}
              sx={{ 
                p: 1,
                mb: 1,
                borderRadius: '8px',
                backgroundColor: 'rgba(124, 77, 255, 0.1)',
                '&:last-child': { mb: 0 }
              }}
            >
              <Typography variant="subtitle2" sx={{ color: theme.palette.primary.light }}>
                {task.title}
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                {task.description}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            No tasks for this date
          </Typography>
        )}
      </Popover>
    </Container>
  );
};

export default Calendar;