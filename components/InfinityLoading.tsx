import React from 'react';
import styles from '../styles/InfinityLoading.module.css'
type props = {
    active: boolean
}

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