import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Box
} from '@mui/material';

interface Subject {
  _id: string;
  title: string;
  name?: string;
  description?: string;
}

interface SubjectListProps {
  subjects: Subject[];
  selectedSubject: Subject | null;
  onSubjectSelect: (subject: Subject) => void;
}

const SubjectList: React.FC<SubjectListProps> = ({
  subjects,
  selectedSubject,
  onSubjectSelect
}) => {
  // Sample data for testing
  const sampleSubjects: Subject[] = [
    {
      _id: 'subject1',
      title: 'Математичний аналіз',
      name: 'Math Analysis',
      description: 'Основи математичного аналізу'
    },
    {
      _id: 'subject2',
      title: 'Програмування',
      name: 'Programming',
      description: 'Основи програмування'
    },
    {
      _id: 'subject3',
      title: 'Бази даних',
      name: 'Databases',
      description: 'Основи баз даних'
    }
  ];

  // Use sample data if no subjects provided
  const displaySubjects = subjects.length > 0 ? subjects : sampleSubjects;

  if (!displaySubjects.length) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Немає доступних предметів
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={0}>
      <List>
        {displaySubjects.map((subject) => (
          <ListItem key={subject._id} disablePadding>
            <ListItemButton
              selected={selectedSubject?._id === subject._id}
              onClick={() => onSubjectSelect(subject)}
            >
              <ListItemText
                primary={subject.title || subject.name}
                secondary={subject.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SubjectList; 