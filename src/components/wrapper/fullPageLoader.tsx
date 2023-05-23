import { CircularProgress } from '@mui/material';
import './style.css';

export function Loader () {
  return  (
  <div className="loader-container">
    <div className="loader">
      <CircularProgress/>
    </div>
  </div>
  );
}
