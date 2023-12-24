import Head from 'next/head'
import Image from 'next/image'
import AdminLayout from '../../shared/components/layouts/AdminLayout'
import PageInfo from '../../shared/components/atoms/pageInfo'

export default function HomePage(props: any) {
    return (
        <AdminLayout>
            <PageInfo name="Home Page" />
            <p>Home</p>
        </AdminLayout>
    )
}

