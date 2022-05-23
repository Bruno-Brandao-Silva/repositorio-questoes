import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/InfinityLoading.module.css'
type props = {
    active: boolean
}
// @keyframes roundandround {
//     to {
//       transform: rotateX(360deg) rotateY(360deg);
//     }
//   }

//   @keyframes show {
//     to {
//       opacity: 1;
//     }
//   }


//   .Scene {
//     width:600px;
//     height:600px;
//     margin:2% auto;
//     perspective: 1000px;
//   }
//   .Wrapper {
//     width:100%;
//     height:100%;
//     transform: rotateX(45deg) rotateY(45deg);
//     transform-style: preserve-3d;
//   }
//   .Ball {
//     position: relative;
//     width: 70%;
//     height: 70%;
//     margin:0 auto;
//     transform-style:  preserve-3d;
//     animation: roundandround 7.5s 1.3s infinite linear;
//   }
//   .Ball .Ring {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     border:6px;
//     border-style: dashed;
//     border-radius: 50%;
//     opacity: 0;
//     animation: show 0.75s forwards ease-in-out;
//   }
//   .Ring:nth-child(1) {
//     color:#8df435;
//     transform: rotateY(4deg);
//     animation-delay: 0s;
//   }
const genRanHex = (size: any) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
export default function InfinityLoading(props: props) {

    if (props.active) {
        return (<>
            <div className={styles.Container}>
                <div className={styles.Ring1}></div>
                <div className={styles.Ring2}></div>
                <div className={styles.Ring3}></div>
                <div className={styles.Ring4}></div>
            </div>
        </>)
    } else {
        return (<></>)
    }
}