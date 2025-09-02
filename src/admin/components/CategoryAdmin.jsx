import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { getFullCategory } from '../../api/api';

function CategoryAdmin() {
	const [deletePopup, setDeletePopup] = useState(false);
	const [category, setCategory] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fullCategory();
	}, []);


	async function fullCategory() {
		const allCategory = await getFullCategory();
		setCategory(allCategory);
	}


	return (
		<main>
			<h1 className='text-center text-[20px] font-[500] my-[20px]'>Kateqoriyaların idarə olunması formu:</h1>
			<div>
				<button
					onClick={() => { openPopup(null) }}
					className='bg-[#188a2f] ml-auto my-[20px] text-white px-[10px] rounded-[7px] min-h-[40px] min-w-[40px] flex justify-center items-center gap-2 cursor-pointer'
					disabled={loading}
				>
					{loading ? "Yüklənir..." : "+ Kateqoriya əlavə et"}
				</button>
			</div>
			<section className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Kateqoriyanın adı
								</th>
								<th scope="col" className="px-6 py-3 text-right">
									Düzəlişlər paneli
								</th>
							</tr>
						</thead>
						<tbody>
							{category.length > 0 ? category.map((item, i) => (
								<tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										Az - {item.name_az} <br />
										En - {item.name_en} <br />
										Ru - {item.name_ru}
									</th>
									<td className="px-6 py-4 text-right flex gap-6 text-[25px] font-medium text-blue-500 hover:underline">
										<BiEdit className='ml-auto cursor-pointer'
											onClick={() => {
												openPopup(item.id);
											}} />
										<MdDeleteForever
											onClick={() => {
												setId(item.id);
												setDeletePopup(true);
											}}
											className='cursor-pointer text-[red]'
										/>
									</td>
								</tr>
							)) : (
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										Kateqoriyalar mövcud deyil
									</th>
									<td className="px-6 py-4 text-right">
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>


				{/* Silmə əməliyyatını təsdiqləyən modal */}
				<div
					onClick={() => { setDeletePopup(!deletePopup) }}
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
								Kateqoriyanı <span className='text-red-700'>silmək</span> istədiyinizə əminsiniz?
							</h3>
						</div>
						<div className='my-4 w-full flex justify-center items-center gap-[30px] m-auto px-2 max-w-lg box-border'>
							<button
								onClick={() => { setDeletePopup(!deletePopup) }}
								type="button"
								className="mb-4 text-white bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
								disabled={loading}
							>
								Xeyr
							</button>
							<button
								type="button"
								className="mb-4 text-white bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
								disabled={loading}
							>
								{loading ? "Yüklənir..." : "Bəli"}
							</button>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default CategoryAdmin;
