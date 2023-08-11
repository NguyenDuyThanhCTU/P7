import React from "react";

const Input = ({ text, Value, setValue }) => {
  return (
    <div>
      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2">{text}</label>

        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={Value}
          placeholder={`Nhập ${text}`}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
