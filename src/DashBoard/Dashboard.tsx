import logo from '../assets/logo.png'

const Dashboard = () => {
  return (
    <div className="">
   
   {/* Headlines */}
      <div className=' flex flex-wrap justify-between items-center px-3'>
        <div>
          <img src={logo} className='w-16 py-4 px-2 ' alt="" />
        </div>

        <div>
          <h1 className=' text-lg md:text-xl font-semibold'>
            Welcome, User
          </h1>
        </div>
      </div>

    </div>
  )
}

export default Dashboard