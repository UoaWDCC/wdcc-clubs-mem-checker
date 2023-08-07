import styles from './style.module.css';
import { useState, useEffect } from 'react';
import GenerateInviteCode from '../../components/GenerateInviteCode'
import axios from 'axios';

export default function Dashboard() {
  const [code, setCode] = useState("click generate")
  const [isClicked, setClicked] = useState(false)
  const placeholder = () => {
    axios
      .get('/club/create-invite-code/25')
      .then(function(response) {
        if (response.status === 200) {
          console.log(response.data);
          setCode(response.data);
        }
      })
      .catch(function (error) {
        console.log(error.data)
      });
  }
  return (
    <div>
      <p>Welcome to the dashboard</p>
      <GenerateInviteCode
        text = {code}
        onClick={placeholder}
        disabled = {isClicked}
      />
    </div>
  );
}
