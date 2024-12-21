import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SelectField from '@/Components/Form/SelectField';
import TextArea from '@/Components/Form/TextArea';
import InputField from '@/Components/Form/InputField';

export default function Edit({ auth, diaryEntry, modules }) {
    const [values, setValues] = useState({
        module_id: diaryEntry.module_id,
        group_id: diaryEntry.group_id,
        session_date: diaryEntry.session_date,
        start_time: diaryEntry.start_time,
        end_time: diaryEntry.end_time,
        content: diaryEntry.content,
    });

    const [groups, setGroups] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (values.module_id) {
            // Fetch groups for selected module
            router.get(`/api/modules/${values.module_id}/groups`, {}, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (response) => {
                    setGroups(response.groups);
                }
            });
        } else {
            setGroups([]);
        }
    }, [values.module_id]);

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/diary-entries/${diaryEntry.id}`, values, {
            onError: (errors) => setErrors(errors),
        });
    };

    const moduleOptions = modules.map(module => ({
        value: module.id,
        label: `${module.name} - ${module.field.name} (${module.level.name})`
    }));

    const groupOptions = groups.map(group => ({
        value: group.id,
        label: group.name
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Diary Entry
                </h2>
            }
        >
            <Head title="Edit Diary Entry" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <SelectField
                                    label="Module"
                                    name="module_id"
                                    value={values.module_id}
                                    onChange={handleChange}
                                    options={moduleOptions}
                                    error={errors.module_id}
                                    required
                                />

                                <SelectField
                                    label="Group"
                                    name="group_id"
                                    value={values.group_id}
                                    onChange={handleChange}
                                    options={groupOptions}
                                    error={errors.group_id}
                                    required
                                    disabled={!values.module_id}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField
                                        label="Session Date"
                                        name="session_date"
                                        type="date"
                                        value={values.session_date}
                                        onChange={handleChange}
                                        error={errors.session_date}
                                        required
                                    />

                                    <InputField
                                        label="Start Time"
                                        name="start_time"
                                        type="time"
                                        value={values.start_time}
                                        onChange={handleChange}
                                        error={errors.start_time}
                                        required
                                    />

                                    <InputField
                                        label="End Time"
                                        name="end_time"
                                        type="time"
                                        value={values.end_time}
                                        onChange={handleChange}
                                        error={errors.end_time}
                                        required
                                    />
                                </div>

                                <TextArea
                                    label="Content"
                                    name="content"
                                    value={values.content}
                                    onChange={handleChange}
                                    error={errors.content}
                                    required
                                    rows={8}
                                />

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Update Entry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
