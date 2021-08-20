import { createUseStyles } from 'react-jss';

const useTaskStyles = createUseStyles({
  container: {
    border: '1px solid #d4d4d4',
    margin: '1rem 0 0 0',
    padding: '0.5rem 0.5rem 0 0.5rem',
  },
  completeBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  subtasksContainer: {
    padding: '0 1.5rem',
    transition: '0.3s all',
  },
});

export default useTaskStyles;
