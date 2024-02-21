import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCycle = () => (
  <div style={{ width: 100, height: 100 }}>
    <CircularProgressbarWithChildren value={66}>
      <h1>32</h1>天
    </CircularProgressbarWithChildren>
  </div>
);

export default ProgressCycle;
