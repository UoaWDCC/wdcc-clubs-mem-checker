import styles from './style.module.css';
import GenerateInviteCode from '../../components/GenerateInviteCode'

export default function Dashboard() {
  function placeholder() {

  }
  return (
    <div>
      <p>Welcome to the dashboard</p>
      <GenerateInviteCode
        onClick={placeholder}
      />
    </div>
  );
}
