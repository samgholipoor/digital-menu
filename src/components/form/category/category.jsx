import { useState } from 'react';

export default function CategoryForm() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <form>
        <div className="my-4">
          <input
            type="text"
            placeholder="نام کتگوری"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            placeholder="توضیحات"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="my-4">
          <input
            type="file"
            className="file-input file-input-bordered file-input-info w-full max-w-xs"
          />
        </div>
      </form>
    </div>
  );
}
