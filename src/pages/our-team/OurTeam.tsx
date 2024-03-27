import Background from '../../components/Background';
import EricZheng from '../../assets/team/eric-zheng.png';
import SerenaLau from '../../assets/team/serena-lau.jpeg';
import AlexMcLeod from '../../assets/team/alex-mcleod.jpg';
import JordanSee from '../../assets/team/jordan-see.jpeg';
import NimitParekh from '../../assets/team/nimit-parekh.jpeg';
import AndrewLam from '../../assets/team/andrew-lam.jpeg';
import BethanyYates from '../../assets/team/bethany-yates.jpeg';
import SebastianThomas from '../../assets/team/sebastian-thomas.jpeg';
import VanishaRajan from '../../assets/team/vanisha-rajan.jpeg';
import styles from './style.module.css';

interface UserAvatarProps {
  src: string;
  name: string;
  bio?: string;
  role?: string;
  link?: string;
}

const UserAvatar = (props: UserAvatarProps) => {
  return (
    <a
      className={styles['user-avatar-container']}
      target="_blank"
      href={props.link}
    >
      <img
        src={props.src}
        className={styles['user-avatar']}
        width="120"
        height="120"
      />
      <h3 className={styles['user-avatar-name']}>{props.name}</h3>
      <p className={styles['user-avatar-role']}>{props.role}</p>
      <p className={styles['user-avatar-bio']}>{props.bio}</p>
    </a>
  );
};

export default function OurTeam() {
  return (
    <Background>
      <div className={styles.container}>
        <h1>Meet the Team!</h1>
        <div className={styles['user-avatar-grid']}>
          <UserAvatar
            src={SerenaLau}
            name="Serena Lau"
            role="Project Manager"
            bio="my superpower is sleeping through alarms"
            link="https://www.linkedin.com/in/serenalau272/"
          />
          <UserAvatar
            src={AlexMcLeod}
            name="Alex McLeod"
            role="Tech Lead"
            bio="i prefer to code with an xbox controller"
            link="https://www.linkedin.com/in/alexwillmcleod"
          />
          <UserAvatar
            src={VanishaRajan}
            name="Vanisha Rajan"
            role="Designer"
            bio="i met Jacinda Ardern in the bathrooms"
            link="https://www.linkedin.com/in/vanisha-rajan-6a76ab245/"
          />
          <UserAvatar
            src={EricZheng}
            name="Eric Zheng"
            bio="not 2 metres tall"
            role="Developer"
            link="https://www.linkedin.com/in/eric-zheng-nz/"
          />
          <UserAvatar
            src={JordanSee}
            name="Jordan See"
            role="Developer"
            bio="i play basketball"
            link="https://www.linkedin.com/in/jordansee2357/"
          />
          <UserAvatar
            src={NimitParekh}
            name="Nimit Parekh"
            role="Developer"
            bio="could climb mount everest"
            link="https://www.linkedin.com/in/nimit-parekh1/"
          />

          <UserAvatar
            src={BethanyYates}
            name="Bethany Yates"
            role="Developer"
            bio="i play the violin"
            link="https://www.linkedin.com/in/bethany-yates-9907651a9/"
          />
          <UserAvatar
            src={AndrewLam}
            name="Andrew Lam"
            role="Developer"
            bio="can't see without glasses"
            link="https://www.linkedin.com/in/andrew-lam-994902201/"
          />
          <UserAvatar
            src={SebastianThomas}
            name="Sebastian Thomas"
            role="Developer"
            bio="can see without glasses"
            link="https://www.linkedin.com/in/sebastian-t-60286a1bb/"
          />
        </div>
      </div>
    </Background>
  );
}
