import { Button, Form, Input, message, Modal, Table } from "antd"
import { useQuery } from "react-query"
import { getUsers } from "../api/user/userApi"
import { useState } from "react"
import type { ColumnsType } from "antd/es/table"
import { useCreateUser } from "../api/user/hooks"

function HomePage(){

  const [addModal,setAddModal] = useState(false)
  const [Id, setId] = useState()


  const {data , isLoading , refetch} = useQuery('getUsers',getUsers)
  const { mutate: create } = useCreateUser()

  const onFinish = (values:any) => {
    console.log({values});
    create(values ,{
      onSuccess() {
        message.success("User created successfully")

      },
      onError(){
        message.error("user creation failed")
      }
    })
  }

  const openEditModal = (values: any) => {
    setId(values.id)
  }

  const cols: ColumnsType<any> = [
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
        </div>
      )
    }
  ]
}



function AboutPage() {
  return (
    <div className="w-full p-10">
      <h1>Home page</h1>
      <Button type="primary" className="">ADD</Button>
      <Table columns={cols} loading={isLoading} dataSource={data?.data} />
      <Modal
        open={addModal}
        onCancel={()=> setAddModal(false)}
        title="Add user"
        >
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item name={'name'} label="Name" rules={[{ required: true , message: "please enter name"}]}>
              <Input/>
            </Form.Item>
            <Form.Item name={'place'} label="Place" rules={[{ required: true , message: "please enter your place"}]}>
              <Input/>
            </Form.Item>
            <Form.Item name={'age'} label="Age" rules={[{ required: true , message: "please enter your age"}]}>
              <Input/>
            </Form.Item>
            <Form.Item >
              <Button htmlType="submit" type="primary" className="w-full">Submit</Button>
            </Form.Item>
          </Form>
        </Modal>

    </div>
  )
}

export default AboutPage