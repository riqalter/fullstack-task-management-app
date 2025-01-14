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
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const teamMembers = [
    {
      id: 1,
      name: 'Muhammad Raihan',
      role: 'Team Lead',
      avatar: '/images/raihan-profile.png',
      email: 'mailto:mr.muhraihan@gmail.com',
      linkedin: 'https://www.linkedin.com/in/muhammadraihan22/',
      expertise: ['Project Management', 'UI/UX', 'Team Leadership']
    },
  {
    id: 2,
    name: 'Harry Mardika',
    role: 'Developer',
    avatar: '/images/harry.jpeg',
    email: 'mailto:harrymardika@student.gunadarma.ac.id',
    linkedin: 'https://www.linkedin.com/in/harry-mardika/',
    expertise: ['Backend', 'Machine Learning Engineer', 'Data Scientist']
  },
  {
    id: 3,
    name: 'Mikail Thoriq',
    role: 'Cloud Engineer',
    avatar: '/images/thoriq.jpeg',
    email: 'mailto:mikailthoriq@student.gunadarma.ac.id',
    linkedin: 'https://www.linkedin.com/in/mikailthoriq/',
    expertise: ['Backend', 'Cloud Platform', 'Machine Learning Engineer']
  },
  // Add more team members as needed
];

const TeamMemberCard = ({ member }) => {
  const theme = useTheme();

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
              <IconButton 
                size="small" 
                sx={{ color: theme.palette.primary.light }}
                href={member.email}
                target="_blank"
                rel="noopener noreferrer"
              >
                <EmailIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ color: theme.palette.primary.light }}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
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