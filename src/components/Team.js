import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const teamMembers = [
    {
      id: 1,
      name: 'Muhammad Raihan',
      role: 'Team Lead',
      avatar: '/images/raihan-profile.PNG',
      email: 'raihan@company.com',
      linkedin: '#',
      tasks: {
        completed: 15,
        total: 20
      },
      expertise: ['Frontend', 'UI/UX', 'React'],
      activeProjects: 3
    },
  {
    id: 2,
    name: 'Harry Mardika',
    role: 'Senior Developer',
    avatar: '/images/harry.JPEG',
    email: 'michael.c@company.com',
    linkedin: '#',
    tasks: {
      completed: 12,
      total: 18
    },
    expertise: ['Backend', 'Database', 'API'],
    activeProjects: 4
  },
  {
    id: 3,
    name: 'Mikail Thoriq',
    role: 'UX Designer',
    avatar: '/images/thoriq.JPEG',
    email: 'emily.r@company.com',
    linkedin: '#',
    tasks: {
      completed: 8,
      total: 12
    },
    expertise: ['Design', 'Prototyping', 'User Research'],
    activeProjects: 2
  },
  // Add more team members as needed
];

const TeamMemberCard = ({ member }) => {
  const theme = useTheme();
  const completionPercentage = (member.tasks.completed / member.tasks.total) * 100;

  return (
    <Card
      sx={{
        background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.8), rgba(19, 47, 76, 0.6))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={member.avatar}
            sx={{
              width: 80,
              height: 80,
              border: `2px solid ${theme.palette.primary.main}`,
              backgroundColor: theme.palette.primary.dark,
            }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{member.name}</Typography>
            <Typography variant="body2" color="text.secondary">{member.role}</Typography>
            <Box sx={{ mt: 1 }}>
              <IconButton size="small" sx={{ color: theme.palette.primary.light }}>
                <EmailIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: theme.palette.primary.light }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Task Completion
          </Typography>
          <LinearProgress
            variant="determinate"
            value={completionPercentage}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette.primary.main,
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {member.tasks.completed} of {member.tasks.total} tasks completed
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Expertise
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {member.expertise.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                sx={{
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  color: theme.palette.primary.light,
                  borderRadius: '4px',
                }}
              />
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            Active Projects: {member.activeProjects}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Team = () => {
  const theme = useTheme();

  return (
    <Box>
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
            color: theme.palette.primary.light,
            mb: 4,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Our Team
        </Typography>

        <Grid container spacing={3}>
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <TeamMemberCard member={member} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Team;