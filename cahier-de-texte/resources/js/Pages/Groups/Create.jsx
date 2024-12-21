import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputField from '@/Components/Form/InputField';
import SelectField from '@/Components/Form/SelectField';

export default function Create({ auth, fields, levels }) {
    const [values, setValues] = useState({
        name: '',
        field_id: '',
        level_id: '',
    });

    const [errors, setErrors] = useState({});

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
        router.post('/groups', values, {
            onError: (errors) => setErrors(errors),
        });
    };

    const fieldOptions = fields.map(field => ({
        value: field.id,
        label: field.name
    }));

    const levelOptions = levels.map(level => ({
        value: level.id,
        label: level.name
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Group
                </h2>
            }
        >
            <Head title="Create Group" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    label="Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    required
                                />

                                <SelectField
                                    label="Field"
                                    name="field_id"
                                    value={values.field_id}
                                    onChange={handleChange}
                                    options={fieldOptions}
                                    error={errors.field_id}
                                    required
                                />

                                <SelectField
                                    label="Level"
                                    name="level_id"
                                    value={values.level_id}
                                    onChange={handleChange}
                                    options={levelOptions}
                                    error={errors.level_id}
                                    required
                                />

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Create Group
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
