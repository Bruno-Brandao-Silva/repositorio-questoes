import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import DefaultHead from '../components/DefaultHead'
import DisciplineComponent from '../components/Discipline'
import Header from '../components/Header'
import InfinityLoading from '../components/InfinityLoading'


const Test: NextPage = () => {
    return <InfinityLoading active={true} />
}

export default Test
