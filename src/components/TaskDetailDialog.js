import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TaskDetailDialog = ({ open, onClose, task }) => {
  if (!task) return null;

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
      return <Typography color="error">Overdue by {Math.abs(diffDays)} days</Typography>;
    } else if (diffDays === 0) {
      return <Typography color="warning.main">Due today</Typography>;
    } else {
      return <Typography color="text.secondary">{dueDate.toLocaleDateString()}</Typography>;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Task Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary">
            Title
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {task.title}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary">
            Status
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip 
              label={task.status.replace('_', ' ').toUpperCase()}
              size="small"
              sx={{ 
                ...getStatusColor(task.status),
                fontWeight: 500,
                fontSize: '0.75rem'
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary">
            Due Date
          </Typography>
          <Box sx={{ mt: 1 }}>
            {formatDueDate(task.due_date)}
          </Box>
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary">
            Description
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 1,
              whiteSpace: 'pre-wrap',
              color: 'text.secondary'
            }}
          >
            {task.description}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailDialog;