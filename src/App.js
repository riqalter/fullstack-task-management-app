import React, { useState, useMemo } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
  Fade,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Calendar from './components/Calendar';
import Team from './components/Team';

function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentView, setCurrentView] = useState('tasks'); // ['tasks', 'calendar', 'team']
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#7C4DFF',
            light: '#B47CFF',
            dark: '#3F1DCB',
          },
          secondary: {
            main: '#00BFA5',
            light: '#33CCBB',
            dark: '#008C7A',
          },
          background: {
            default: '#0A1929',
            paper: '#132F4C',
          },
          text: {
            primary: '#ffffff',
            secondary: '#B2BAC2',
          },
        },
        typography: {
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          h5: {
            fontWeight: 600,
            letterSpacing: 0.5,
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                },
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: '#132F4C',
                borderRight: '1px solid rgba(255,255,255,0.05)',
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  const handleTaskSaved = () => {
    setSelectedTask(null);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setCurrentView('tasks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setDrawerOpen(false);
  };

  const drawerWidth = 240;

  const navigationItems = [
    { text: 'Tasks', icon: <AssignmentIcon />, view: 'tasks', color: theme.palette.secondary.main },
    { text: 'Calendar', icon: <CalendarMonthIcon />, view: 'calendar', color: theme.palette.primary.main },
    { text: 'Team', icon: <GroupsIcon />, view: 'team', color: theme.palette.primary.light }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'calendar':
        return <Calendar />;
      case 'team':
        return <Team />;
      default:
        return (
          <>
            <Fade in={true} timeout={800}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  mb: 4,
                  borderRadius: '16px',
                  background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.8), rgba(19, 47, 76, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    color: theme.palette.primary.light,
                    mb: 3,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {selectedTask ? 'Edit Task' : 'Create New Task'}
                </Typography>
                <TaskForm 
                  task={selectedTask} 
                  onTaskSaved={handleTaskSaved} 
                />
              </Paper>
            </Fade>

            <Fade in={true} timeout={1000}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4,
                  borderRadius: '16px',
                  background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.8), rgba(19, 47, 76, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    color: theme.palette.secondary.light,
                    mb: 3,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Task List
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 3,
                    textAlign: 'center',
                  }}
                >
                  Tekan tombol refresh untuk memuat ulang data jika sudah di tambahkan atau di edit
                </Typography>
                <TaskList onEditTask={handleEditTask} />
              </Paper>
            </Fade>
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: theme.palette.background.default }}>
        <CssBaseline />
        
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: 'rgba(19, 47, 76, 0.9)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #7C4DFF, #00BFA5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Task Management
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <AccountCircleIcon />
            </Avatar>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              marginTop: '64px',
              background: theme.palette.background.paper,
            },
          }}
        >
          <List sx={{ mt: 2 }}>
            {navigationItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                onClick={() => handleNavigation(item.view)}
                sx={{
                  margin: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: currentView === item.view ? 'rgba(124, 77, 255, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(124, 77, 255, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: item.color }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontWeight: 500,
                      fontSize: '0.95rem',
                    } 
                  }} 
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: '64px',
            marginLeft: drawerOpen ? `${drawerWidth}px` : 0,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
              {renderContent()}
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;