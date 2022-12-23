import imagePlaceholder from './assets/image-placeholder.svg';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowsUpDownIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [imageUrl, setImageUrl] = useState(imagePlaceholder);
  const fileRef = useRef<HTMLInputElement>(null);

  /**
   * 이미지 업로드 버튼 클릭 핸들러
   */
  const handleUploadClick = () => {
    fileRef.current?.click();
  };

  /**
   * 파일 이벤트 핸들러
   */
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const previewImageUrl = URL.createObjectURL(e.target.files[0]);
    setImageUrl(previewImageUrl);
  };

  /**
   * 메모리 최적화
   */
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-r from-slate-800 to-slate-700">
      <div className="w-11/12 max-w-4xl space-y-2 rounded-lg bg-slate-100 px-4 py-4 shadow-lg">
        <h1 className="select-none text-lg font-bold text-slate-500">
          이미지 편집기
        </h1>

        <section className="flex flex-col-reverse space-y-3 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-2">
          <div className="space-y-2 rounded-sm border-2 px-3 py-2 sm:w-1/2">
            <h2>필터</h2>

            <div className="grid grid-cols-2 gap-2">
              <button className="border-2 py-2 transition hover:bg-slate-200">
                Brightness
              </button>
              <button className="border-2 py-2 transition hover:bg-slate-200">
                Saturation
              </button>
              <button className="border-2 py-2 transition hover:bg-slate-200">
                Inversion
              </button>
              <button className="border-2 py-2 transition hover:bg-slate-200">
                Grayscale
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Brightness</p>
                <p>100%</p>
              </div>
              <input type="range" min={0} max={200} className="w-full " />
            </div>

            <div>
              <p>회전</p>
              <div className="flex space-x-2">
                <button className="rotate-btn">
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                </button>
                <button className="rotate-btn">
                  <ArrowUturnRightIcon className="h-5 w-5" />
                </button>
                <button className="rotate-btn">
                  <ArrowsRightLeftIcon className="h-5 w-5" />
                </button>
                <button className="rotate-btn">
                  <ArrowsUpDownIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div
            aria-label="이미지 출력뷰"
            className="flex flex-1 items-center justify-center rounded-sm border-2"
          >
            <input
              ref={fileRef}
              onChange={handleUploadImage}
              type="file"
              accept="imaage/*"
              hidden
            />
            <img src={imageUrl} alt="preview-img" className="h-full" />
          </div>
        </section>

        <footer className="flex flex-col space-y-2 sm:flex-row sm:justify-between">
          <button className="w-full rounded-md border-2 py-2 text-slate-500 transition hover:bg-slate-200 sm:w-36">
            필터 초기화
          </button>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <button
              onClick={handleUploadClick}
              className="w-full rounded-md border-2 bg-slate-500 py-2 text-slate-100 transition hover:bg-slate-600 sm:w-36"
            >
              이미지 올리기
            </button>
            <button className="w-full rounded-md border-2 bg-indigo-500 py-2 text-slate-100 transition hover:bg-indigo-600 sm:w-36">
              저장
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
