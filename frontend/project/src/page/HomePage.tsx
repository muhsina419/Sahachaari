import { Button, Form, Input, InputNumber, message, Modal, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useQuery } from "react-query"
import { getUsers } from "../api/user/userApi"
import { useCreateUser, useDeleteUser, useUpdateUser } from "../api/user/hooks"
import { useState } from "react"

function HomePage() {
    const { data, isLoading, refetch } = useQuery('getUsers', getUsers)
    const { mutate: create } = useCreateUser()
    const { mutate: update } = useUpdateUser()
    const { mutate: deleteUser } = useDeleteUser()

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [Id, setId] = useState()
    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()

    const onFinish = (values: any) => {
        console.log({ values });
        create(values, {
            onSuccess() {
                message.success("user created successfully")
                form.resetFields()
                setAddModal(false)
                refetch()
            },
            onError() {
                message.error("failed")
            }
        })
    }

    const openEditModal = (values: any) => {
        setId(values.id)
        updateForm.setFieldsValue({
            name: values.name,
            place: values.place,
            age: values.age
        })
        setEditModal(true)
    }

    const updateFinish = (values: any) => {
        const updateData = {
            id: Id,
            ...values
        }
        update(updateData, {
            onSuccess: () => {
                message.success("User Updated Succesfully")
                setEditModal(false)
                refetch()
            },
            onError: () => {
                message.error("failed")
            }
        })
    }

    const onDelete = (values: any) => {
                deleteUser(values.id , {
                    onSuccess: () => {
                        message.success("User deleted successfully")
                        refetch()
                    },
                    onError: () => {
                        message.error("Failed to delete")
                    }
                })
    }

    const colums: ColumnsType<any> = [
        {
            title: 'id',
            dataIndex: "id",
            key: 'id'
        },
        {
            title: 'name',
            dataIndex: "name",
            key: 'name'
        },
        {
            title: 'place',
            dataIndex: "place",
            key: 'place'
        },
        {
            title: 'age',
            dataIndex: "age",
            key: 'age'
        },
        {
            title: "Action",
            key: 'id',
            render: (recode) => (
                <div className="flex justify-center gap-4">
                    <Button onClick={() => openEditModal(recode)}>Edit</Button>
                    <Button onClick={() => onDelete(recode)}>Delete</Button>
                </div>
            )
        }
    ]

    return (
        <div className="w-full p-10">
            <h1>Home page</h1>
            <Button type="primary" onClick={() => setAddModal(true)}>Add</Button>
            <Table columns={colums} loading={isLoading} dataSource={data?.data} />

            <Modal
                open={addModal}
                onCancel={() => setAddModal(false)}
                footer={null}
                title="Add user"
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'place'} label="place" rules={[{ required: true, message: "please enter place" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'age'} label="age" className="w-full" rules={[{ required: true, message: "please enter age" }]}>
                        <InputNumber className="w-full" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" className="w-full">Submti</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={editModal}
                onCancel={() => setEditModal(false)}
                footer={null}
                title="edit user"
            >
                <Form layout="vertical" onFinish={updateFinish} form={updateForm}>
                    <Form.Item name={'name'} label="Name" rules={[{ required: true, message: "please enter name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'place'} label="place" rules={[{ required: true, message: "please enter place" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'age'} label="age" className="w-full" rules={[{ required: true, message: "please enter age" }]}>
                        <InputNumber className="w-full" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" className="w-full">Submti</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default HomePage
