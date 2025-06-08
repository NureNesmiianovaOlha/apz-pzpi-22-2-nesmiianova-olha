import React, { useState, useEffect } from 'react';
import { getUserRole } from '../../utils/auth';
import { getTeacherSubjects } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Dashboard.module.css';
import StudentGrades from '../teacher/StudentGrades';
import StudentList from '../teacher/StudentList';
import SubjectList from '../teacher/SubjectList';
import MyGrades from '../student/MyGrades';
import MyGroup from '../student/MyGroup';
import MySubjects from '../student/MySubjects';
import UserManagement from '../admin/UserManagement';
import GroupManagement from '../admin/GroupManagement';
import SubjectManagement from '../admin/SubjectManagement';
import type { Subject } from '../../types/subject';

const Dashboard: React.FC = (): React.ReactElement => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (userRole === 'teacher' && user?._id) {
        try {
          setLoading(true);
          const data = await getTeacherSubjects(user._id);
          setSubjects(data);
        } catch (err) {
          setError('Помилка при завантаженні предметів');
          console.error('Error fetching subjects:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubjects();
  }, [userRole, user]);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const renderTeacherDashboard = () => (
    <div className={styles.dashboardSection}>
      <h2>Панель викладача</h2>
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      <div className={styles.buttonGrid}>
        <button 
          className={`${styles.dashboardButton} ${activeComponent === 'grades' ? styles.active : ''}`}
          onClick={() => setActiveComponent('grades')}
        >
          Оцінки студентів
        </button>
        <button 
          className={`${styles.dashboardButton} ${activeComponent === 'students' ? styles.active : ''}`}
          onClick={() => setActiveComponent('students')}
        >
          Список студентів
        </button>
        <button 
          className={`${styles.dashboardButton} ${activeComponent === 'subjects' ? styles.active : ''}`}
          onClick={() => {
            setActiveComponent('subjects');
            if (!selectedSubject && subjects.length > 0) {
              setSelectedSubject(subjects[0]);
            }
          }}
        >
          Предмети
        </button>
      </div>
      
      <div className={styles.componentContainer}>
        {loading ? (
          <div className={styles.loading}>Завантаження...</div>
        ) : (
          <>
            {activeComponent === 'grades' && (
              <>
                <SubjectList
                  subjects={subjects}
                  selectedSubject={selectedSubject}
                  onSubjectSelect={handleSubjectSelect}
                />
                {selectedSubject && (
                  <div className={styles.gradesContainer}>
                    <h3>{selectedSubject.title}</h3>
                    <StudentGrades subjectId={selectedSubject._id} />
                  </div>
                )}
                {!selectedSubject && (
                  <div className={styles.noSelection}>
                    Виберіть предмет для перегляду оцінок
                  </div>
                )}
              </>
            )}
            {activeComponent === 'students' && <StudentList />}
            {activeComponent === 'subjects' && (
              <SubjectList
                subjects={subjects}
                selectedSubject={selectedSubject}
                onSubjectSelect={handleSubjectSelect}
              />
            )}
          </>
        )}
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className={styles.dashboardSection}>
      <h2>Панель студента</h2>
      <div className={styles.buttonGrid}>
        <button 
          className={`${styles.dashboardButton} ${activeComponent === 'grades' ? styles.active : ''}`}
          onClick={() => setActiveComponent('grades')}
        >
          Мої оцінки
        </button>
        <button 
          className={`${styles.dashboardButton} ${activeComponent === 'group' ? styles.active : ''}`}
          onClick={() => setActiveComponent('group')}
        >
          Моя група
        </button>
        <button 
          className={`${styles.dashboardButton} ${activeComponent === 'subjects' ? styles.active : ''}`}
          onClick={() => setActiveComponent('subjects')}
        >
          Мої предмети
        </button>
      </div>
      
      <div className={styles.componentContainer}>
        {activeComponent === 'grades' && <MyGrades />}
        {activeComponent === 'group' && <MyGroup />}
        {activeComponent === 'subjects' && <MySubjects />}
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className={styles.dashboardSection}>
      <h2>Панель адміністратора</h2>
      <div className={styles.buttonGrid}>
        <button 
          className={`${styles.dashboardButton} ${activeComponent === 'users' ? styles.active : ''}`}
          onClick={() => setActiveComponent('users')}
        >
          Користувачі
        </button>
        <button 
          className={`${styles.dashboardButton} ${activeComponent === 'groups' ? styles.active : ''}`}
          onClick={() => setActiveComponent('groups')}
        >
          Групи
        </button>
        <button 
          className={`${styles.dashboardButton} ${activeComponent === 'subjects' ? styles.active : ''}`}
          onClick={() => setActiveComponent('subjects')}
        >
          Предмети
        </button>
      </div>
      
      <div className={styles.componentContainer}>
        {activeComponent === 'users' && <UserManagement />}
        {activeComponent === 'groups' && <GroupManagement />}
        {activeComponent === 'subjects' && <SubjectManagement />}
      </div>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      {userRole === 'teacher' && renderTeacherDashboard()}
      {userRole === 'student' && renderStudentDashboard()}
      {userRole === 'admin' && renderAdminDashboard()}
    </div>
  );
};

export default Dashboard;