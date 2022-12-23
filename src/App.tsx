export default function App() {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-r from-slate-800 to-slate-700">
      <div className="w-11/12 max-w-4xl rounded-lg bg-slate-100 px-2 py-3 shadow-lg">
        <h2 className="text-lg text-slate-500">Image Editor</h2>

        <section>{/*  */}</section>

        <footer className="flex flex-col space-y-2 sm:flex-row sm:justify-between">
          <button className="w-full rounded-md border-2 py-2 text-slate-500 sm:w-36">
            필터 초기화
          </button>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <button className="w-full rounded-md border-2 bg-slate-500 py-2 text-slate-100 sm:w-36">
              이미지 올리기
            </button>
            <button className="w-full rounded-md border-2 bg-indigo-500 py-2 text-slate-100 sm:w-36">
              저장
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
