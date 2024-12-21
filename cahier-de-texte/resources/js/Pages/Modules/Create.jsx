import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, fields, levels, professors }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        field_id: '',
        level_id: '',
        professor_ids: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('modules.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Module</h2>}
        >
            <Head title="Create Module" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="4"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="field_id" value="Field" />
                                    <select
                                        id="field_id"
                                        name="field_id"
                                        value={data.field_id}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('field_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a field</option>
                                        {fields.map((field) => (
                                            <option key={field.id} value={field.id}>
                                                {field.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.field_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="level_id" value="Level" />
                                    <select
                                        id="level_id"
                                        name="level_id"
                                        value={data.level_id}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('level_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a level</option>
                                        {levels.map((level) => (
                                            <option key={level.id} value={level.id}>
                                                {level.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.level_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="professor_ids" value="Professors" />
                                    <select
                                        id="professor_ids"
                                        name="professor_ids"
                                        value={data.professor_ids}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('professor_ids', 
                                            Array.from(e.target.selectedOptions, option => option.value))}
                                        multiple
                                        required
                                    >
                                        {professors.map((professor) => (
                                            <option key={professor.id} value={professor.id}>
                                                {professor.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.professor_ids} className="mt-2" />
                                    <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) or Command (Mac) to select multiple professors</p>
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Create Module
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
