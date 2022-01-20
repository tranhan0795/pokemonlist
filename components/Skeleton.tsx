import type { NextPage } from 'next'

const Skeleton: NextPage = () => {
    return (
        <div className='flex flex-wrap gap-6 mt-5  animate-pulse h-30'>
            {[...(new Array(12))].map((v, i) => {
                return (
                    <div key={i} className=' p-1 m-0 w-80 h-20 text-center flex flex-wrap justify-center gap-4 content-center  rounded-xl 
              bg-gray-300 '>
                    </div>
                )
            })}
        </div>
    )
}

export default Skeleton