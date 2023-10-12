import prismadb from '@/lib/prismadb'
import UserGroupList from '@/components/usergroup-list'

const UserGroupPage = async () => {
  const usergroup = await prismadb.userGroup.findMany();
  return (
    <div className='h-full p-14 space-y-4'>
      <UserGroupList data={usergroup} />
    </div>
  )
}

export default UserGroupPage