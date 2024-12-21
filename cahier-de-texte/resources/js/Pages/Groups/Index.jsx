import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTable from '@/Components/DataTable';

export default function Index({ auth, groups }) {
    const columns = [
        {
            header: 'Name',
            accessor: (group) => group.name,
        },
        {
            header: 'Field',
            accessor: (group) => group.field?.name || 'N/A',
        },
        {
            header: 'Level',
            accessor: (group) => group.level?.name || 'N/A',
        },
        {
            header: 'Diary Entries',
            accessor: (group) => group.diary_entries?.length || 0,
        },
    ];

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this group?')) {
            router.delete(`/groups/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Groups
                    </h2>
                    <Link
                        href="/groups/create"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Add Group
                    </Link>
                </div>
            }
        >
            <Head title="Groups" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DataTable
                        columns={columns}
                        data={groups}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
