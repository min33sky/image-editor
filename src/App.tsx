import imagePlaceholder from './assets/image-placeholder.svg';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowsUpDownIcon,
  ArrowsRightLeftIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('brightness');
  const [filters, setFilters] = useState({
    brightness: 100,
    saturation: 100,
    inversion: 0,
    grayscale: 0,
  });
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [imageUrl, setImageUrl] = useState(imagePlaceholder);
  const fileRef = useRef<HTMLInputElement>(null); // 파일 업로드를 위한 ref
  const imageRef = useRef<HTMLImageElement>(null); // 이미지를 위한 ref

  /**
   * 필터 선택
   * @param filter 필터 종류
   */
  const handleActiveFilter = (filter: FilterType) => {
    setCurrentFilter(filter);
  };

  /**
   * 필터 값 변경 핸들러
   */
  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [currentFilter]: Number(e.target.value),
    });
  };

  /**
   * 회전 및 뒤집기 핸들러
   * @param direction 회전 방향
   */
  const handleRotate = (direction: rotateType) => {
    if (direction === 'left') {
      setRotate((prev) => prev - 90);
    } else if (direction === 'right') {
      setRotate((prev) => prev + 90);
    } else if (direction === 'horizontal') {
      setFlipHorizontal((prev) => !prev);
    } else if (direction === 'vertical') {
      setFlipVertical((prev) => !prev);
    }
  };

  /**
   * 이미지에 필터 적용
   */
  const applyFilter = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = `rotate(${rotate}deg) ${
      flipHorizontal ? 'scaleX(-1)' : 'scaleX(1)'
    } ${flipVertical ? 'scaleY(-1)' : 'scaleY(1)'}`;
    imageRef.current.style.filter = `brightness(${filters.brightness}%) saturate(${filters.saturation}%) invert(${filters.inversion}%) grayscale(${filters.grayscale}%)`;
  };

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
   * 필터 초기화
   */
  const resetFilters = () => {
    setFilters({
      brightness: 100,
      saturation: 100,
      inversion: 0,
      grayscale: 0,
    });
    setRotate(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
  };

  /**
   * 이미지 저장
   */
  const saveImage = () => {
    if (!imageRef.current) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageRef.current.naturalWidth;
    canvas.height = imageRef.current.naturalHeight;

    if (!ctx) return;

    ctx.filter = `brightness(${filters.brightness}%) saturate(${filters.saturation}%) invert(${filters.inversion}%) grayscale(${filters.grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); // 중심점을 이미지의 중심으로 이동
    if (rotate !== 0) ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
    ctx.drawImage(imageRef.current, -canvas.width / 2, -canvas.height / 2); // 이미지를 중심점을 기준으로 그리기

    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  /**
   * 필터 변경 시 이미지에 필터 적용
   */
  useEffect(() => {
    applyFilter();
  }, [filters, rotate, flipHorizontal, flipVertical]);

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
        <h1 className="select-none font-bold text-slate-500">이미지 편집기</h1>

        <section className="flex flex-col-reverse space-y-3 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-2">
          <div className="space-y-3 rounded-sm border-2 px-3 py-2 sm:w-1/2">
            <h2>필터</h2>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleActiveFilter('brightness')}
                className={`border-2 py-2 transition  ${
                  currentFilter === 'brightness'
                    ? 'text-slate-10 bg-indigo-500 text-slate-100'
                    : 'hover:bg-slate-200'
                }`}
              >
                명도
              </button>
              <button
                onClick={() => handleActiveFilter('saturation')}
                className={`border-2 py-2 transition  ${
                  currentFilter === 'saturation'
                    ? 'text-slate-10 bg-indigo-500 text-slate-100'
                    : 'hover:bg-slate-200'
                }`}
              >
                채도
              </button>
              <button
                onClick={() => handleActiveFilter('inversion')}
                className={`border-2 py-2 transition  ${
                  currentFilter === 'inversion'
                    ? 'text-slate-10 bg-indigo-500 text-slate-100'
                    : 'hover:bg-slate-200'
                }`}
              >
                반전
              </button>
              <button
                onClick={() => handleActiveFilter('grayscale')}
                className={`border-2 py-2 transition  ${
                  currentFilter === 'grayscale'
                    ? 'text-slate-10 bg-indigo-500 text-slate-100'
                    : 'hover:bg-slate-200'
                }`}
              >
                회색조
              </button>
            </div>

            <div aria-label="필터 게이지" className="space-y-2">
              <div className="flex justify-between">
                <p className="first-letter:uppercase">
                  {FilterKoreanName[currentFilter]}
                </p>
                <p className="">{filters[currentFilter]}%</p>
              </div>
              <input
                type="range"
                onChange={handleChangeFilter}
                min={0}
                max={filterMaxValueMap[currentFilter]}
                value={filters[currentFilter]}
                className="w-full "
              />
            </div>

            <div>
              <p>회전</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRotate('left')}
                  className="rotate-btn"
                >
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleRotate('right')}
                  className="rotate-btn"
                >
                  <ArrowUturnRightIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleRotate('horizontal')}
                  className="rotate-btn"
                >
                  <ArrowsRightLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleRotate('vertical')}
                  className="rotate-btn"
                >
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
            <img
              ref={imageRef}
              src={imageUrl}
              alt="preview-img"
              className="h-[300px]"
            />
          </div>
        </section>

        <footer className="flex flex-col space-y-2 sm:flex-row sm:justify-between">
          <button
            aria-label="Button to reset filters"
            title="필터 초기화"
            onClick={resetFilters}
            className="w-full rounded-md border-2 py-2 text-sm text-slate-500 transition hover:bg-slate-200 sm:w-36"
          >
            필터 초기화
          </button>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <button
              aria-label="Button to upload image"
              title="이미지 올리기"
              onClick={handleUploadClick}
              className="flex w-full items-center justify-center gap-1 rounded-md border-2 bg-slate-500 py-2 text-slate-100 transition hover:bg-slate-600 sm:w-36"
            >
              <ArrowUpTrayIcon className="inline-block h-5 w-5" />
              <p className="text-sm">이미지 올리기</p>
            </button>
            <button
              aria-label="Button to save image"
              onClick={saveImage}
              title="이미지 저장"
              className="flex w-full items-center justify-center gap-1 rounded-md border-2 bg-indigo-500 py-2 text-slate-100 transition hover:bg-indigo-600 sm:w-36"
            >
              <ArrowDownTrayIcon className="inline-block h-5 w-5" />
              <p className="text-sm">저장</p>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

type FilterType = 'brightness' | 'saturation' | 'inversion' | 'grayscale';
type rotateType = 'left' | 'right' | 'horizontal' | 'vertical';

const filterMaxValueMap = {
  brightness: 200,
  saturation: 200,
  inversion: 100,
  grayscale: 100,
} as const;

enum FilterKoreanName {
  brightness = '명도',
  saturation = '채도',
  inversion = '반전',
  grayscale = '회색조',
}
