import { useEffect, useState } from 'react';
import { getProducts } from '../../api/api';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import Logo from "../../assets/img/logo.svg";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


function AddProduct() {

    const [deletePopup, setDeletePopup] = useState(false)
    const [products, setProducts] = useState(null)
    const [originalProducts, setOriginalProducts] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const data = await getProducts();
        setProducts(data.products);
        setOriginalProducts(data.products);
    };

    async function axtaris(e) {
        const value = e.target.value;
        if (value.length > 2) {
            const filteredProducts = originalProducts.filter(product =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            setProducts(filteredProducts);
        } else {
            setProducts(originalProducts);
        }
    }


    return (
        <main>
            <h1 className='text-center text-[20px] font-[500] my-[20px]'>Məhsullarin idarə olunmasi formu:</h1>
            <div>
                <button
                    onClick={() => { openPopup(null) }}
                    className='bg-[#188a2f] ml-auto my-[20px] text-white px-[10px] rounded-[7px] min-h-[40px] min-w-[40px] flex justify-center items-center gap-2 cursor-pointer'
                >+ Məhsul əlavə et</button>
            </div>
            <div className="relative flex flex-1 border-[#ccc] border overflow-hidden rounded-md h-[50px] my-4 px-2">
                <label htmlFor="search-field" className="sr-only">
                    Məhsulun adını daxil et
                </label>
                <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-[10px] h-full w-5 text-gray-400"
                />
                <input
                    onChange={axtaris}
                    id="axtar-field"
                    name="axtar"
                    type="axtar"
                    placeholder="Məhsulun adını daxil et..."
                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 outline-none sm:text-sm"
                />
            </div>
            <section className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" colSpan={4} className="px-6 py-4 text-center text-[22px] text-white">
                                Məhsullar siyahısı!
                            </th>
                        </tr>
                        <tr className='text-white'>
                            <th scope="col" className="px-6 py-3">Şəkil, ad və kateqoriya</th>
                            <th scope="col" className="px-6 py-3">Məhsul haqqında</th>
                            <th scope="col" className="px-6 py-3">Qiymet</th>
                            <th scope="col" className="px-6 py-3">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products == null ?
                            <tr className="cursor-pointer bg-white border-b border-gray-700 hover:bg-gray-200">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Yüklənir...</span>
                                    </div>
                                </th>
                                <td className="px-6 py-4 text-[red]">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Yüklənir...</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Yüklənir...</span>
                                    </div>
                                </td>
                                <td className="px-6 pr-0 py-4">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Yüklənir...</span>
                                    </div>
                                </td>
                            </tr>
                            :
                            products.length !== 0 ? products.map((item, i) => {
                                return (
                                    <tr key={i} className="cursor-pointer bg-white border-b border-gray-700 hover:bg-gray-200">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                            <img className="w-10 h-10 rounded-full" src={item.img.length !== 0 ? item.img[0] : Logo} alt={item.name} />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">Az - {item.name_az}</div>
                                                <div className="text-base font-semibold">En - {item.name_en}</div>
                                                <div className="text-base font-semibold">Ru - {item.name_ru}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div dangerouslySetInnerHTML={{ __html: item.description_az }} ></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">{item.price} ₼</div>
                                        </td>
                                        <td className="px-6 pr-0 py-4">
                                            <div className="flex gap-4 text-[20px] font-medium text-blue-500 hover:underline">
                                                <BiEdit className='cursor-pointer'
                                                    onClick={() => {
                                                        openPopup(item.id)
                                                    }} />
                                                <MdDeleteForever
                                                    onClick={() => {
                                                        setDelId(item.id);
                                                        setDeletePopup(true);
                                                    }}
                                                    className='cursor-pointer text-[red]'
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                                :
                                <tr className="cursor-pointer bg-white border-b border-gray-700 hover:bg-gray-200">
                                    <th colSpan={4} scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                        Məhsul mövcud deyil
                                    </th>
                                </tr>
                        }
                    </tbody>
                </table>


                {/* silme emeliyyatini testiqleyem modal */}
                <div
                    onClick={() => {
                        setDelId(null);
                        setDeletePopup(false);
                    }}
                    tabIndex="-1"
                    aria-hidden="true"
                    style={{ display: deletePopup ? "flex" : "none" }}
                    className="fixed top-0 left-0 right-0 z-50 items-center bg-[#00000028] justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-[500px] bg-white max-h-full"
                    >
                        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Məhsulu <span className='text-red-700'>silmək</span> istədiyinizə əminsiz?
                            </h3>
                        </div>
                        <div className='my-4 w-full flex justify-center items-center gap-[30px] m-auto px-2 max-w-lg box-border'>
                            <button
                                onClick={() => {
                                    setDelId(null);
                                    setDeletePopup(false);
                                }}
                                type="button"
                                className="mb-4 text-white bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                Xeyr
                            </button>
                            <button
                                type="button"
                                className="mb-4 text-white bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                disabled={loading}
                            >
                                {loading ? <span>Yüklənir...</span> : "Bəli"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AddProduct;
