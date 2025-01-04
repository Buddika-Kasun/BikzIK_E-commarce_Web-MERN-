import { IoClose } from 'react-icons/io5';

const AddField = ({close, value, onChange, onSubmit}) => {
  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center z-50">
        <div className="bg-white max-w-md w-full p-4 rounded-md">
            <div className='flex items-center justify-center'>
                <h2 className="font-semibold">Add Field</h2>
                <button
                    onClick={close}
                    className="w-fit ml-auto hover:text-red-400"
                >
                    <IoClose size={25} />
                </button>
            </div>
            <input
                type="text"
                name=""
                placeholder="Enter field name"
                value={value}
                onChange={onChange}
                required
                className=" w-full my-2 outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
            />
            <button
                onClick={onSubmit}
                className='bg-green-500 text-white px-4 py-1 rounded mx-auto w-fit block hover:bg-green-600'
            >
                Add
            </button>
        </div>
    </section>
  )
}

export default AddField;