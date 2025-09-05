import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { getFullCategory, createCategory, createImg, deleteCategoryById } from '../../api/api';
import toast, { Toaster } from 'react-hot-toast';

function CategoryAdmin() {
  const [addPopup, setAddPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(null); // silinəcək id burada saxlanacaq
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // yeni kateqoriya üçün state
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fullCategory();
  }, []);

  async function fullCategory() {
    const allCategory = await getFullCategory();
    setCategory(allCategory);
  }

  // şəkil seçiləndə həm faylı, həm də preview-u yadda saxla
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // yalnız post sorğusu (add)
  const handleSubmit = async () => {
    if (!title) {
      setError("Zəhmət olmasa başlıq daxil edin!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let imgUrl = preview; // default əvvəlki şəkil qalır
      if (image) {
        const imgResponse = await createImg(image);
        imgUrl = imgResponse.file.path;
      }

      const data = { title, image: imgUrl };

      await createCategory(data);
      toast.success("✅ Kateqoriya əlavə olundu!");

      // resetlə
      setAddPopup(false);
      setTitle("");
      setImage(null);
      setPreview(null);
      fullCategory();

    } catch (err) {
      console.error(err);
      toast.error("❌ Xəta baş verdi, yenidən yoxlayın!");
    } finally {
      setLoading(false);
    }
  };

  // kateqoriyanı sil
  const confirmDelete = async () => {
    try {
      setLoading(true);
      await deleteCategoryById(deletePopup);
      toast.success("🗑️ Kateqoriya silindi!");
      fullCategory();
      setDeletePopup(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Kateqoriyanı silmək mümkün olmadı!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative">
      <Toaster />
      <h1 className="text-center text-[20px] font-[500] my-[20px]">
        Kateqoriyaların idarə olunması formu:
      </h1>

      <div>
        <button
          onClick={() => setAddPopup(true)}
          className="bg-[#188a2f] ml-auto my-[20px] text-white px-[10px] rounded-[7px] min-h-[40px] min-w-[40px] flex justify-center items-center gap-2 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Yüklənir..." : "+ Kateqoriya əlavə et"}
        </button>
      </div>

      {/* Category table */}
      <section className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
          <thead className="text-[18px] text-white uppercase bg-[#3F4C5A] dark:bg-gray-700 dark:text-gray-400">
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
            {category.length > 0 ? (
              category.map((item, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.image}
                  </th>
                  <td className="px-6 py-4 text-right flex gap-6 text-[25px] font-medium text-blue-500 hover:underline justify-end">
                    <MdDeleteForever
                      onClick={() => setDeletePopup(item.id)}
                      className="cursor-pointer text-red-500 hover:text-red-700 transition"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th className="px-6 py-4">Kateqoriyalar mövcud deyil</th>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Yeni Kateqoriya əlavə etmək üçün Modal */}
      <div
        onClick={() => setAddPopup(false)}
        style={{ display: addPopup ? "flex" : "none" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-fadeIn"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Yeni Kateqoriya Əlavə Et
          </h3>

          {/* Error mesajı */}
          {error && (
            <p className="text-red-500 mb-3 font-medium text-sm bg-red-100 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Input */}
          <label className="block text-sm font-medium text-gray-700 mb-1">Başlıq daxil edin</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          {/* File upload */}
          <label className="block text-sm font-medium text-gray-700 mb-1">Şəkil seçin</label>
          <input
            key={preview}  
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3 w-full text-sm file:mr-4 file:py-2 file:px-4 
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-green-50 file:text-green-700
                      hover:file:bg-green-100 cursor-pointer"
          />


          {/* Preview şəkil */}
          {preview && (
            <div className="mb-3 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-h-40 rounded-lg border shadow-sm"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setAddPopup(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
            >
              Ləğv et
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg shadow-md transition"
            >
              {loading ? "Yüklənir..." : "Yadda saxla"}
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirm popup */}
      {deletePopup && (
        <div
          onClick={() => setDeletePopup(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center"
          >
            <h2 className="text-lg font-semibold mb-4">
              Silmək istədiyinizə əminsiniz?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeletePopup(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Ləğv et
              </button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400"
              >
                {loading ? "Silinir..." : "Bəli, sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CategoryAdmin;
