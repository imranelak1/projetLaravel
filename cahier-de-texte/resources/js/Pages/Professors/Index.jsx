import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/DataTable';

export default function Index({ auth, professors }) {
    const columns = [
        {
            header: 'Name',
            accessor: (professor) => professor.name,
        },
        {
            header: 'Email',
            accessor: (professor) => professor.email,
        },
        {
            header: 'Modules',
            accessor: (professor) => professor.modules?.length || 0,
        },
        {
            header: 'Diary Entries',
            accessor: (professor) => professor.diary_entries?.length || 0,
        },
    ];

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this professor?')) {
            router.delete(`/professors/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Professors
                    </h2>
                    {auth.user.role === 'admin' && (
                        <Link
                            href="/professors/create"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Professor
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Professors" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        data={professors}
                        onDelete={auth.user.role === 'admin' ? handleDelete : null}
                        actions={auth.user.role === 'admin'}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
