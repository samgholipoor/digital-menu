import { useState } from 'react';

export default function FoodForm() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <form>
        <select className="select select-primary w-full max-w-xs">
          <option disabled selected>
            What is the best TV show?
          </option>
          <option>Game of Thrones</option>
          <option>Lost</option>
          <option>Breaking Bad</option>
          <option>Walking Dead</option>
        </select>

        <div className="my-4">
          <input
            type="text"
            placeholder="نام غذا"
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
