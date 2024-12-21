import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SelectField from '@/Components/Form/SelectField';
import TextArea from '@/Components/Form/TextArea';
import InputField from '@/Components/Form/InputField';

export default function Create({ auth, modules, groups }) {
    const [values, setValues] = useState({
        module_id: '',
        group_id: '',
        session_date: new Date().toISOString().split('T')[0],
        start_time: '',
        end_time: '',
        content: '',
    });

    const [errors, setErrors] = useState({});
    const [filteredGroups, setFilteredGroups] = useState([]);

    useEffect(() => {
        if (values.module_id) {
            const selectedModule = modules.find(m => m.id === parseInt(values.module_id));
            const moduleGroups = groups.filter(g => 
                g.field_id === selectedModule.field_id && 
                g.level_id === selectedModule.level_id
            );
            setFilteredGroups(moduleGroups);
            setValues(v => ({ ...v, group_id: '' }));
        } else {
            setFilteredGroups([]);
        }
    }, [values.module_id, modules, groups]);

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
        router.post(route('diary-entries.store'), values, {
            onError: (errors) => setErrors(errors),
            preserveScroll: true,
        });
    };

    const moduleOptions = modules.map(module => ({
        value: module.id,
        label: `${module.name} - ${module.field.name} (${module.level.name})`
    }));

    const groupOptions = filteredGroups.map(group => ({
        value: group.id,
        label: `${group.name} - ${group.field.name} (${group.level.name})`
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Diary Entry
                </h2>
            }
        >
            <Head title="Create Diary Entry" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <SelectField
                                    label="Module"
                                    id="module_id"
                                    name="module_id"
                                    value={values.module_id}
                                    onChange={handleChange}
                                    options={moduleOptions}
                                    error={errors.module_id}
                                    required
                                />

                                <SelectField
                                    label="Group"
                                    id="group_id"
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
                                        id="session_date"
                                        name="session_date"
                                        type="date"
                                        value={values.session_date}
                                        onChange={handleChange}
                                        error={errors.session_date}
                                        required
                                    />

                                    <InputField
                                        label="Start Time"
                                        id="start_time"
                                        name="start_time"
                                        type="time"
                                        value={values.start_time}
                                        onChange={handleChange}
                                        error={errors.start_time}
                                        required
                                    />

                                    <InputField
                                        label="End Time"
                                        id="end_time"
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
                                    id="content"
                                    name="content"
                                    value={values.content}
                                    onChange={handleChange}
                                    error={errors.content}
                                    required
                                    rows={8}
                                />

                                <div className="flex items-center justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Create Entry
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
