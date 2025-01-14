import React, { useState, useEffect } from 'react';
import TaskService from '../services/TaskService';
import TaskDetailDialog from './TaskDetailDialog';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    IconButton,
    Chip,
    useTheme,
    CircularProgress,
    Alert,
    Box,
    Typography,
    Fade,
    Tooltip,
    TablePagination,
    TextField,
    InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';

const TaskList = ({ onEditTask }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        setLoading(true);
        setError(null);
        TaskService.getAllTasks()
            .then(response => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading tasks:', error);
                setError('Failed to load tasks. Please try again later.');
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            TaskService.deleteTask(id)
                .then(() => {
                    loadTasks();
                })
                .catch(error => {
                    console.error('Error deleting task:', error);
                    setError('Failed to delete task. Please try again.');
                });
        }
    };

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'completed':
                return {
                    bgcolor: 'rgba(46, 125, 50, 0.2)',
                    color: '#69f0ae',
                    border: '1px solid #69f0ae'
                };
            case 'in_progress':
                return {
                    bgcolor: 'rgba(237, 108, 2, 0.2)',
                    color: '#ffb74d',
                    border: '1px solid #ffb74d'
                };
            default:
                return {
                    bgcolor: 'rgba(2, 136, 209, 0.2)',
                    color: '#4fc3f7',
                    border: '1px solid #4fc3f7'
                };
        }
    };

    const formatDueDate = (date) => {
        const dueDate = new Date(date);
        const today = new Date();
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return <Typography color="error" variant="body2">Overdue by {Math.abs(diffDays)} days</Typography>;
        } else if (diffDays === 0) {
            return <Typography color="warning.main" variant="body2">Due today</Typography>;
        } else {
            return <Typography color="text.secondary" variant="body2">{dueDate.toLocaleDateString()}</Typography>;
        }
    };

    const handleOpenDetails = (task) => {
        setSelectedTask(task);
        setDetailDialogOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailDialogOpen(false);
        setSelectedTask(null);
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: '200px'
            }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert 
                severity="error" 
                sx={{ 
                    backgroundColor: 'rgba(211, 47, 47, 0.1)', 
                    color: '#ff1744' 
                }}
            >
                {error}
            </Alert>
        );
    }

    return (
        <Fade in={true} timeout={800}>
            <Box>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <TextField
                        size="small"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: '250px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <TableContainer 
                    component={Paper} 
                    sx={{ 
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        backgroundImage: 'none',
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell 
                                    sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.primary.light,
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                    }}
                                >
                                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Tooltip title="Refresh Tasks" arrow>
                                        <IconButton 
                                            onClick={loadTasks}
                                            color="primary"
                                            sx={{ 
                                                mr: 2,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(124, 77, 255, 0.1)',
                                                }
                                            }}
                                        >
                                        <RefreshIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <TextField
                                        size="small"
                                        placeholder="Search tasks..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        sx={{
                                            width: '250px',
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                                },
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                                </TableCell>
                                <TableCell 
                                    sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.primary.light,
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                    }}
                                >Description</TableCell>
                                <TableCell 
                                    sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.primary.light,
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                    }}
                                >Status</TableCell>
                                <TableCell 
                                    sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.primary.light,
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                    }}
                                >Due Date</TableCell>
                                <TableCell 
                                    sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.primary.light,
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                    }}
                                >Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTasks
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((task) => (
                                <TableRow 
                                    key={task.id}
                                    component={motion.tr}
                                    whileHover={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                        transition: { duration: 0.2 }
                                    }}
                                    sx={{ 
                                        cursor: 'pointer',
                                        '& td': { 
                                            borderBottom: `1px solid ${theme.palette.divider}`,
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {task.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: 'text.secondary',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                maxWidth: '200px'
                                            }}
                                        >
                                            {task.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={task.status.replace('_', ' ').toUpperCase()}
                                            size="small"
                                            sx={{ 
                                                ...getStatusColor(task.status),
                                                fontWeight: 500,
                                                fontSize: '0.75rem'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{formatDueDate(task.due_date)}</TableCell>
                                    <TableCell>
                                        <Tooltip title="View Details" arrow>
                                            <IconButton 
                                                onClick={() => handleOpenDetails(task)}
                                                color="primary"
                                                size="small"
                                                sx={{ 
                                                    mr: 1,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(124, 77, 255, 0.1)',
                                                    }
                                                }}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit Task" arrow>
                                            <IconButton 
                                                onClick={() => onEditTask(task)}
                                                color="primary"
                                                size="small"
                                                sx={{ 
                                                    mr: 1,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(124, 77, 255, 0.1)',
                                                    }
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Task" arrow>
                                            <IconButton 
                                                onClick={() => handleDelete(task.id)}
                                                color="error"
                                                size="small"
                                                sx={{ 
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                                    }
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={filteredTasks.length}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    sx={{
                        color: 'text.secondary',
                        borderTop: `1px solid ${theme.palette.divider}`,
                        '& .MuiTablePagination-select': {
                            color: 'text.primary'
                        }
                    }}
                />

                <TaskDetailDialog
                    open={detailDialogOpen}
                    onClose={handleCloseDetails}
                    task={selectedTask}
                />
            </Box>
        </Fade>
    );
};

export default TaskList;
