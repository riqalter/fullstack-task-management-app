import React, { useState, useEffect } from 'react';
import TaskService from '../services/TaskService';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Alert,
    Box,
    CircularProgress,
    useTheme,
    Typography,
    InputAdornment,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import EventIcon from '@mui/icons-material/Event';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';

const TaskForm = ({ task, onTaskSaved }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        due_date: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        if (task) {
            setFormData(task);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        const promise = task?.id
            ? TaskService.updateTask({ ...formData, id: task.id })
            : TaskService.createTask(formData);

        promise
            .then(() => {
                setSuccess(task?.id ? 'Task updated successfully!' : 'Task created successfully!');
                onTaskSaved();
                if (!task?.id) resetForm();
                setTimeout(() => setSuccess(null), 3000);
            })
            .catch(error => {
                setError('Failed to save task. Please try again.');
                console.error('Error saving task:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            status: 'pending',
            due_date: ''
        });
        setError(null);
        setSuccess(null);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed':
                return theme.palette.success.main;
            case 'in_progress':
                return theme.palette.warning.main;
            default:
                return theme.palette.info.main;
        }
    };

    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root, & .MuiFormControl-root': {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                        }
                    },
                    '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                    },
                }
            }}
        >
            {error && (
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: 2,
                        backgroundColor: 'rgba(211, 47, 47, 0.1)', 
                        color: '#ff1744'
                    }}
                >
                    {error}
                </Alert>
            )}
            {success && (
                <Alert 
                    severity="success" 
                    sx={{ 
                        mb: 2,
                        backgroundColor: 'rgba(46, 125, 50, 0.1)', 
                        color: '#69f0ae'
                    }}
                >
                    {success}
                </Alert>
            )}
            
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TitleIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={formData.status}
                            label="Status"
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            sx={{
                                '& .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }
                            }}
                        >
                            {['pending', 'in_progress', 'completed'].map((status) => (
                                <MenuItem 
                                    key={status} 
                                    value={status}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: getStatusColor(status)
                                        }}
                                    />
                                    <Typography sx={{ textTransform: 'capitalize' }}>
                                        {status.replace('_', ' ')}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon sx={{ color: 'text.secondary', mt: 1 }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Due Date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.due_date}
                        onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EventIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        height: '100%', 
                        alignItems: 'center' 
                    }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                            sx={{
                                height: 56,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                                '&:hover': {
                                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                                }
                            }}
                        >
                            {task?.id ? 'Update Task' : 'Create Task'}
                        </Button>
                        
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={resetForm}
                            disabled={loading}
                            startIcon={<ClearIcon />}
                            sx={{
                                height: 56,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                }
                            }}
                        >
                            Reset
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TaskForm;